const axios = require("axios");

const getCoordinates = async (location) => {
  try {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { q: location, format: "json", limit: 1 },
        headers: { "User-Agent": "ai-volunteer-system" }
      }
    );

    if (!res.data.length) return null;

    return {
      latitude: parseFloat(res.data[0].lat),
      longitude: parseFloat(res.data[0].lon)
    };
  } catch (e) {
    return null;
  }
};

router.post("/volunteers", async (req, res) => {
  try {
    const updated = await Promise.all(
      req.body.map(async (v) => {
        const coords = await getCoordinates(v.location);

        return {
          ...v,
          latitude: coords?.latitude,
          longitude: coords?.longitude
        };
      })
    );

    const volunteers = await Volunteer.insertMany(updated);

    res.json({ message: "Bulk volunteers added", volunteers });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});