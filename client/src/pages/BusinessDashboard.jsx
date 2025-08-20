import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function BusinessDashboard() {
  const [mine, setMine] = useState([]);
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [a, b] = await Promise.all([
        axios.get("/pets/my-pets"),
        axios.get("/pets/favorites"),
      ]);
      setMine(Array.isArray(a.data) ? a.data : []);
      setFavs(Array.isArray(b.data) ? b.data : []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;

  const totalCreated = mine.length;
  const totalFavorites = favs.length;

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <h2>Dashboard</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
        }}
      >
        <div
          style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}
        >
          <div>Total Created</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{totalCreated}</div>
        </div>
        <div
          style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}
        >
          <div>Total Favorites</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{totalFavorites}</div>
        </div>
      </div>
    </div>
  );
}
