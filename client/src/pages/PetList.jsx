import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";

function PetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const q = params.get("q") || "";
  const type = params.get("type") || "";

  useEffect(() => {
    async function fetchPets() {
      try {
        setLoading(true);
        const usp = new URLSearchParams();
        if (q) usp.set("q", q);
        if (type) usp.set("type", type);
        const res = await axios.get(`/pets?${usp.toString()}`);
        setPets(Array.isArray(res.data) ? res.data : []);
      } catch {
        setPets([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, [q, type]);

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!pets.length) return <div style={{ padding: 16 }}>No pets found.</div>;

  return (
    <div>
      <h2 style={{ padding: "0 16px" }}>Available Pets</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: "1rem",
          padding: "16px",
        }}
      >
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default PetList;
