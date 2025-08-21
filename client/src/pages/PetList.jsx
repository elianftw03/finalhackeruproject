import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";
import "../styles/PetList.css";

function PetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const speciesParam = params.get("species") || params.get("type") || "";
  const qParam = params.get("q") || "";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        if (speciesParam) qs.set("species", speciesParam);
        if (qParam) qs.set("q", qParam);
        const url = qs.toString() ? `/pets?${qs.toString()}` : "/pets";
        const { data } = await axios.get(url);
        setPets(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [speciesParam, qParam]);

  return (
    <div className="petlist-wrap">
      <div className="petlist-header">
        <h2>
          {speciesParam ? `${speciesParam}s` : "All Pets"}
          {qParam ? ` · “${qParam}”` : ""}
        </h2>
      </div>
      {loading ? (
        <div className="petlist-loading">Loading...</div>
      ) : (
        <div className="pet-grid">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PetList;
