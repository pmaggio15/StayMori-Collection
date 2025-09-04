import axios from "axios";
import React, { useState, useEffect } from 'react'


let cachedToken = null;
let tokenExpiresAt = 0;

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check environment variables
    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      console.error('Missing environment variables: AMADEUS_CLIENT_ID or AMADEUS_CLIENT_SECRET');
      return res.status(500).json({ error: 'Server configuration error - missing API credentials' });
    }

    const isProd = (process.env.AMADEUS_ENV || "test") === "production";
    const BASE = isProd ? "https://api.amadeus.com" : "https://test.api.amadeus.com";

    // Check if we have a valid cached token (with 30 second buffer)
    const now = Date.now();
    if (cachedToken && now < tokenExpiresAt - 30 * 1000) {
      console.log('✅ Using cached token');
      return res.status(200).json({ access_token: cachedToken });
    }

    // Request new token
    console.log(`🔑 Requesting new token from: ${BASE}/v1/security/oauth2/token`);
    
    const form = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
    });

    const response = await axios.post(
      `${BASE}/v1/security/oauth2/token`,
      form.toString(),
      { 
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded" 
        },
        timeout: 10000 // 10 second timeout
      }
    );

    const { data } = response;
    
    if (!data.access_token) {
      throw new Error('No access token received from Amadeus API');
    }

    // Cache the token
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in * 1000);

    console.log(`✅ Token obtained successfully, expires in ${data.expires_in} seconds`);
    
    res.status(200).json({ 
      access_token: cachedToken,
      expires_in: data.expires_in
    });
    
  } catch (error) {
    console.error('❌ Auth error:', error.response?.data || error.message);
    
    // Clear cached token on error
    cachedToken = null;
    tokenExpiresAt = 0;
    
    // Return specific error messages
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: 'Invalid API credentials. Please check your AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in Vercel environment variables.' 
      });
    } else if (error.code === 'ECONNABORTED') {
      return res.status(500).json({ error: 'Request timeout. Amadeus API is slow to respond.' });
    } else if (error.response?.status >= 500) {
      return res.status(502).json({ error: 'Amadeus authentication service is currently unavailable.' });
    }
    
    res.status(500).json({ 
      error: "Failed to get access token",
      details: error.message 
    });
  }
}