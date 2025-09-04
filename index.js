const hotelsWrapper = document.querySelector(".hotels");
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const loadingEl = document.getElementById("loading");
const searchBtn = document.getElementById("searchBtn");
const appContent = document.getElementById("appContent");
const attribution = document.createElement("div");

attribution.id = "attribution";
attribution.innerHTML = `Hotel data powered by <a href="https://developers.amadeus.com" target="_blank">Amadeus API</a>`;
document.body.appendChild(attribution);

let debounceTimeout;
let accessToken = null;

// Debounce function to avoid too many API calls
function debounceRenderHotels(term) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    renderHotels(term);
  }, 1000);
}

// Filter event listener
filterSelect.addEventListener('change', () => {
  if (!filterSelect.value) {
    hotelsWrapper.innerHTML = ""
  } else {
    renderHotels(searchInput.value)
  }
});

// Get Amadeus access token
async function getAccessToken() {
  if (accessToken) return accessToken;
  
  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: '', // Replace with your actual client ID
      client_secret: '', // Replace with your actual client secret
    }),
  });
  
  if (!response.ok) throw new Error(`Authentication failed: ${response.status}`);
  
  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
}

// Get hotels from Amadeus API
async function getHotels(cityCode = 'PAR') {
  await new Promise(res => setTimeout(res, 1000));
  
  const token = await getAccessToken();
  
  // First get hotel list by city
  const hotelsResponse = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!hotelsResponse.ok) throw new Error(`HTTP ${hotelsResponse.status}`);
  
  const hotelsData = await hotelsResponse.json();
  
  if (!hotelsData.data || hotelsData.data.length === 0) {
    return [];
  }
  
  // Get hotel IDs and search for offers
  const hotelIds = hotelsData.data.slice(0, 10).map(hotel => hotel.hotelId);
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 7); // 1 week from now
  const checkOut = new Date();
  checkOut.setDate(checkOut.getDate() + 9); // 2 nights
  
  const offersResponse = await fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIds.join(',')}&checkInDate=${checkIn.toISOString().split('T')[0]}&checkOutDate=${checkOut.toISOString().split('T')[0]}&adults=2`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (offersResponse.ok) {
    const offersData = await offersResponse.json();
    return offersData.data || [];
  }
  
  // Fallback to basic hotel data if offers fail
  return hotelsData.data.map(hotel => ({
    hotel: {
      hotelId: hotel.hotelId,
      name: hotel.name,
      address: hotel.address || {},
      geoCode: hotel.geoCode
    },
    offers: [{
      price: {
        total: Math.floor(Math.random() * 300) + 100, // Mock price
        currency: 'USD'
      },
      room: {
        typeEstimated: {
          category: 'STANDARD'
        }
      }
    }],
    available: true
  }));
}

// City code mapping
const CITY_CODES = {
  'paris': 'PAR',
  'london': 'LON',
  'new york': 'NYC',
  'tokyo': 'TOK',
  'sydney': 'SYD',
  'rome': 'ROM',
  'barcelona': 'BCN',
  'amsterdam': 'AMS',
  'berlin': 'BER',
  'miami': 'MIA'
};

function getCityCode(cityName) {
  const lowerCity = cityName.toLowerCase();
  return CITY_CODES[lowerCity] || 'PAR'; // Default to Paris
}

async function renderHotels(searchTerm = "") {
  appContent.style.display = "none";
  loadingEl.classList.add("active");
  hotelsWrapper.innerHTML = "";
  
  try {
    const cityCode = searchTerm ? getCityCode(searchTerm) : 'PAR';
    const hotels = await getHotels(cityCode);
    
    let list = hotels.filter(h => h.hotel && h.hotel.name);
    
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter(h =>
        h.hotel.name.toLowerCase().includes(term) ||
        (h.hotel.address && h.hotel.address.cityName && h.hotel.address.cityName.toLowerCase().includes(term))
      );
    }
    
    const sortType = filterSelect.value;
    if (sortType === "LUXURY") {
      list = list.filter(h => h.offers && h.offers[0] && h.offers[0].price.total > 200);
    } else if (sortType === "BUDGET") {
      list = list.filter(h => h.offers && h.offers[0] && h.offers[0].price.total <= 200);
    }
    
    if (list.length === 0) {
      hotelsWrapper.innerHTML = `
        <div class="no-results">
          <p>"${searchTerm}" hotels are not available. Please try a different destination.</p>
        </div>
      `;
      return;
    }
    
    hotelsWrapper.innerHTML = list.slice(0, 9).map((hotel) => {
      const price = hotel.offers && hotel.offers[0] ? hotel.offers[0].price.total : 150;
      const currency = hotel.offers && hotel.offers[0] ? hotel.offers[0].price.currency : 'USD';
      const roomType = hotel.offers && hotel.offers[0] && hotel.offers[0].room ? hotel.offers[0].room.typeEstimated.category : 'Standard';
      const address = hotel.hotel.address ? 
        `${hotel.hotel.address.cityName || ''}, ${hotel.hotel.address.countryCode || ''}`.trim() : 
        'Location not available';
      
      return `
        <div class="hotel">
          <figure class="hotel__img--wrapper">
            <img class="hotel__img" src="/assets/hotel-placeholder.jpg" alt="${hotel.hotel.name}">
            <div class="info__overlay">Book Now</div>
          </figure>
          <div class="hotel__title">${hotel.hotel.name}</div>
          <div class="hotel__location">Location: ${address}</div>
          <div class="hotel__room">Room: ${roomType}</div>
          <h1 class="hotel__price">${currency} ${price}/night</h1>
        </div>
      `;
    }).join("");
    
  } catch (err) {
    console.error("renderHotels errors:", err);
    hotelsWrapper.innerHTML = `
      <div class="error-message">
        <p>Failed to load hotels. Please check your API credentials and try again.</p>
        <p class="error-details">${err.message}</p>
      </div>
    `;
  } finally {
    loadingEl.classList.remove("active");
    appContent.style.display = "";
  }
}

// Event listeners
searchBtn.addEventListener("click", () => renderHotels(searchInput.value));

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    renderHotels(searchInput.value);
  }
});

// Auto-search with debounce
searchInput.addEventListener("input", () => {
  debounceRenderHotels(searchInput.value);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  renderHotels();
});