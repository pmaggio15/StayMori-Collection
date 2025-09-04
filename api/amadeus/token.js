// api/amadeus/token.js
import axios from "axios";

let cachedToken = null;
let tokenExpiresAt = 0;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      return res.status(500).json({ error: "Missing AMADEUS credentials" });
    }

    const now = Date.now();
    if (cachedToken && now < tokenExpiresAt - 30_000) {
      return res.status(200).json({ access_token: cachedToken });
    }

    const BASE = (process.env.AMADEUS_ENV || "test") === "production"
      ? "https://api.amadeus.com"
      : "https://test.api.amadeus.com";

    const form = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
    });

    const { data } = await axios.post(
      `${BASE}/v1/security/oauth2/token`,
      form.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }, timeout: 10000 }
    );

    cachedToken = data.access_token;
    tokenExpiresAt = now + data.expires_in * 1000;
    return res.status(200).json({ access_token: cachedToken, expires_in: data.expires_in });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get access token" });
  }
}
