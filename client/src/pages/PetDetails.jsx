import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`/pets/${id}`);
        setPet(res.data);
        if (user && user.favorites && user.favorites.includes(res.data._id)) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.error("Failed to fetch pet details");
      }
    };
    fetchPet();
  }, [id, user]);

  const toggleFavorite = async () => {
    try {
      await axios.patch(`/pets/${pet._id}/favorite`);
    } catch (err) {
      console.error(
        "❌ Failed to toggle favorite:",
        err.response?.data || err.message
      );
    }
  };

  if (!pet) return <p>Loading...</p>;

  return (
    <div>
      <h2>{pet.name}</h2>
      <img src={pet.image} alt={pet.name} style={{ maxWidth: "400px" }} />
      <p>
        <strong>Type:</strong> {pet.type}
      </p>
      <p>
        <strong>Age:</strong> {pet.age}
      </p>
      <p>
        <strong>Breed:</strong> {pet.breed}
      </p>
      <p>
        <strong>Description:</strong> {pet.description}
      </p>
      <p>
        <strong>Shelter: </strong>
        {pet.createdBy?.name || "Unknown"}
      </p>
      <p>
        <strong>Location: </strong>
        {pet.createdBy?.location || "Not Specified"}
      </p>

      {user && (
        <button onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      )}
    </div>
  );
}

export default PetDetails;
