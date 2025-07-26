import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("/pets");
        setPets(res.data);
      } catch (err) {
        console.error("Failed to fetch pets");
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      <h2>Available Pets</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default PetList;
