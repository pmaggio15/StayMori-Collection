// src/utils/api.js

// Get the base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE || window.location.origin;

export const API_ENDPOINTS = {
  hotels: "/api/amadeus/hotels",
  token: "/api/amadeus/token",
};

// Function to fetch hotels from Amadeus API
export async function getFeaturedHotels(cityCode = "NYC") {
  const url = new URL(API_ENDPOINTS.hotels, API_BASE_URL);
  url.searchParams.set("cityCode", cityCode);

  try {
    console.log('Fetching hotels from:', url.toString());
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 200)}`);
    }
    
    const payload = await response.json();
    console.log('API Response:', payload);
    
    // Return the data array or empty array if no data
    return Array.isArray(payload?.data) ? payload.data : [];
    
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
}

// Optional: Function to get available cities
export const AVAILABLE_CITIES = [
  { code: "NYC", name: "New York" },
  { code: "PAR", name: "Paris" },
  { code: "LON", name: "London" },
  { code: "LAX", name: "Los Angeles" },
  { code: "MIA", name: "Miami" },
  { code: "CHI", name: "Chicago" }
];

export default API_BASE_URL;