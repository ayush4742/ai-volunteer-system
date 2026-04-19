import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import { useEffect, useMemo, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔧 Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// 🔴 Problem icon
const problemIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

// 🟢 Volunteer icon
const volunteerIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

// 🚑 Moving icon
const movingIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [38, 38],
});

// 🔥 Offset (avoid overlap)
const getOffset = (value, key) => {
  const seed = key.toString().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const offset = ((seed % 10) - 5) * 0.001;
  return value + offset;
};

// 🔥 Auto zoom (only once)
const FitBounds = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      map.fitBounds(route, { padding: [50, 50] });
    }
  }, [map, route]);

  return null;
};

const MapView = ({ problems = [], volunteers = [], route = [], onComplete }) => {
  const [animatedRoute, setAnimatedRoute] = useState([]);
  const [remaining, setRemaining] = useState({ distance: 0, eta: 0 });

  const animationRef = useRef(null);

  console.log("ROUTE FROM APP:", route);

  // ✅ Normalize route
  const normalizedRoute = useMemo(() => {
    if (!Array.isArray(route)) return [];
    return route.filter(p => Array.isArray(p) && p.length === 2);
  }, [route]);

  // 🔥 distance calculator
  const calculateDistance = (route) => {
    let total = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const [lat1, lon1] = route[i];
      const [lat2, lon2] = route[i + 1];

      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

      total += 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    return total;
  };

  // 🎬 Animation
  useEffect(() => {
    if (!normalizedRoute.length) {
      setAnimatedRoute([]);
      return;
    }

    setAnimatedRoute([]);
    let i = 0;
    let progress = 0;

    const animate = () => {
      if (i >= normalizedRoute.length - 1) {
        // 🔥 DESTINATION REACHED
        if (onComplete) onComplete();
        return;
      }

      const p1 = normalizedRoute[i];
      const p2 = normalizedRoute[i + 1];

      progress += 0.02;

      const lat = p1[0] + (p2[0] - p1[0]) * progress;
      const lng = p1[1] + (p2[1] - p1[1]) * progress;

      setAnimatedRoute(prev => [...prev, [lat, lng]]);

      // 🔥 remaining distance
      const remainingRoute = normalizedRoute.slice(i);
      const dist = calculateDistance(remainingRoute);
      const eta = Math.round((dist / 35) * 60);

      setRemaining({
        distance: dist.toFixed(2),
        eta
      });

      if (progress >= 1) {
        progress = 0;
        i++;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);

  }, [normalizedRoute, onComplete]);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "500px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔴 Problems */}
      {problems.map((p, i) => {
        if (!p.latitude || !p.longitude) return null;

        return (
          <Marker
            key={i}
            position={[
                getOffset(p.latitude, p._id),
                getOffset(p.longitude, p._id)
                ]}
            icon={problemIcon}
          >
            <Popup>{p.title}<br />Location: {p.location}</Popup>
          </Marker>
        );
      })}

      {/* 🟢 Volunteers */}
      {volunteers.map((v, i) => {
        if (!v.latitude || !v.longitude) return null;

        return (
          <Marker
            key={i}
            position={[
                getOffset(v.latitude, v._id),
                getOffset(v.longitude, v._id)
                ]}
            icon={volunteerIcon}
          >
            <Popup>{v.name}<br />Rating: {v.rating}</Popup>
          </Marker>
        );
      })}

      {/* 🔵 ROUTE */}
      {animatedRoute.length > 1 && (
        <>
          <Polyline
            positions={animatedRoute}
            pathOptions={{ color: "blue", weight: 5 }}
          />

          <Marker
            position={animatedRoute[animatedRoute.length - 1]}
            icon={movingIcon}
          >
            <Popup>
              🚑 Moving... <br />
              📏 {remaining.distance} km <br />
              ⏱ {remaining.eta} mins
            </Popup>
          </Marker>

          {/* 🔥 zoom only once */}
          {animatedRoute.length < 5 && (
            <FitBounds route={normalizedRoute} />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default MapView;