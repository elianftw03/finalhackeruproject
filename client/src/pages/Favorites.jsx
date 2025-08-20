import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";

export default function Favorites() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const res = await axios.get("/pets/favorites");
      const data = Array.isArray(res.data)
        ? res.data.map((p) => ({ ...p, _isFav: true }))
        : [];
      setPets(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleFavoriteChanged(id, isFav) {
    if (!isFav) setPets((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!pets.length)
    return <div style={{ padding: 16 }}>You have no favorite pets yet.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>My Favorites</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: "1rem",
          marginTop: 12,
        }}
      >
        {pets.map((pet) => (
          <PetCard
            key={pet._id}
            pet={pet}
            onFavoriteChanged={handleFavoriteChanged}
          />
        ))}
      </div>
    </div>
  );
}
