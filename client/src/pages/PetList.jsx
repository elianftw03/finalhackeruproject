import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";

function PetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const species = params.get("species") || "";

  useEffect(() => {
    const load = async () => {
      try {
        const endpoint = species
          ? `/pets?species=${encodeURIComponent(species.slice(0, -1))}`
          : "/pets";
        const { data } = await axios.get(endpoint);
        setPets(data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [species]);

  if (loading)
    return (
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
        Loading...
      </div>
    );

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: 16 }}>
        {species ? `${species} Available for Adoption` : "Available Pets"}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default PetList;
