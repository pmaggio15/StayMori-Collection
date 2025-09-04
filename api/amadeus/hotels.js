import fetch from 'node-fetch';

// Amadeus API configuration
const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;
const AMADEUS_ENV = process.env.AMADEUS_ENV || 'test';

const AMADEUS_BASE_URL = AMADEUS_ENV === 'production' 
  ? 'https://api.amadeus.com' 
  : 'https://test.api.amadeus.com';

// Cache for access token
let tokenCache = {
  token: null,
  expiresAt: 0
};

async function getAccessToken() {
  // Check if we have a valid cached token
  if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const response = await fetch(`${AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_CLIENT_ID,
      client_secret: AMADEUS_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  
  // Cache the token (expires in 1799 seconds, we'll refresh 5 minutes early)
  tokenCache.token = data.access_token;
  tokenCache.expiresAt = Date.now() + (data.expires_in - 300) * 1000;
  
  return data.access_token;
}

async function searchHotels({ cityCode, checkInDate, checkOutDate, adults = 2 }) {
  const accessToken = await getAccessToken();
  
  const params = new URLSearchParams({
    cityCode,
    adults: adults.toString(),
  });
  
  if (checkInDate) params.append('checkInDate', checkInDate);
  if (checkOutDate) params.append('checkOutDate', checkOutDate);
  
  const url = `${AMADEUS_BASE_URL}/v3/shopping/hotel-offers?${params}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Amadeus API error: ${response.status}`);
  }

  return await response.json();
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment variables
    if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
      return res.status(500).json({ 
        error: 'Amadeus credentials not configured',
        details: 'Please set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET environment variables'
      });
    }

    const { 
      cityCode = 'NYC', 
      checkInDate, 
      checkOutDate, 
      adults = '2' 
    } = req.query;

    // Validate cityCode
    if (!cityCode || cityCode.length !== 3) {
      return res.status(400).json({ 
        error: 'Invalid cityCode', 
        details: 'cityCode must be a 3-letter IATA city code (e.g., NYC, PAR, LON)' 
      });
    }

    console.log('Searching hotels for:', { cityCode, checkInDate, checkOutDate, adults });

    const hotelData = await searchHotels({
      cityCode: cityCode.toUpperCase(),
      checkInDate,
      checkOutDate,
      adults: parseInt(adults, 10),
    });

    // Transform the data to match your frontend expectations
    const transformedData = hotelData.data?.map(item => ({
      hotel: {
        hotelId: item.hotel?.hotelId || '',
        name: item.hotel?.name || 'Unknown Hotel',
        address: {
          cityName: item.hotel?.address?.cityName || '',
          countryCode: item.hotel?.address?.countryCode || '',
        },
        geoCode: item.hotel?.geoCode,
      },
      offers: item.offers?.map(offer => ({
        price: {
          total: parseFloat(offer.price?.total || '0'),
          currency: offer.price?.currency || 'USD',
        },
        room: {
          typeEstimated: {
            category: offer.room?.typeEstimated?.category || 'STANDARD',
          },
        },
      })) || [],
    })) || [];

    res.status(200).json({
      data: transformedData,
      meta: {
        count: transformedData.length,
        cityCode,
        checkInDate,
        checkOutDate,
        adults,
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    
    res.status(500).json({
      error: 'Failed to fetch hotels',
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}