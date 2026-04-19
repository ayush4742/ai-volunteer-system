const axios = require("axios");

const getCoordinates = async (location) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search`;

    const res = await axios.get(url, {
      params: {
        q: location,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "en"
      }
    });

    console.log("GEOCODE RESPONSE:", res.data);

    if (!res.data || res.data.length === 0) {
      return null;
    }

    return {
      latitude: parseFloat(res.data[0].lat),
      longitude: parseFloat(res.data[0].lon),
    };

  } catch (error) {
    console.log("Geocoding error:", error.response?.status || error.message);
    return null;
  }
};

module.exports = getCoordinates;