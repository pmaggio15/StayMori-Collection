import API_BASE_URL, { API_ENDPOINTS } from "./config";

export async function getFeaturedHotels(cityCode = "NYC") {
  const url = new URL(API_ENDPOINTS.hotels, API_BASE_URL);
  url.searchParams.set("cityCode", cityCode);

  const resp = await fetch(url.toString());
  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(`HTTP ${resp.status}: ${txt.slice(0, 200)}`);
  }
  const payload = await resp.json();
  return Array.isArray(payload?.data) ? payload.data : [];
}
