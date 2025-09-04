const API_BASE_URL = import.meta.env.VITE_API_BASE || window.location.origin;

export const API_ENDPOINTS = {
  hotels: "/api/amadeus/hotels",
};

export default API_BASE_URL;
