import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";
import { useAuth } from "../context/AuthContext";

function MyPets() {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const res = await axios.get("/pets/my-pets");
        setPets(res.data);
      } catch (err) {
        console.error("Failed to fetch your pets");
      }
    };

    if (user && user.role !== "regular") fetchMyPets();
  }, [user]);

  if (!user || user.role === "regular") return <p>Unauthorized.</p>;

  return (
    <div>
      <h2>My Listed Pets</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {pets.length > 0 ? (
          pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <p>You haven't added any pets yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyPets;
