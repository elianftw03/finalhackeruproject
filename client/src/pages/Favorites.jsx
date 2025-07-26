import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import PetCard from "../components/PetCard";
import { useAuth } from "../context/AuthContext";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/pets/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to fetch favorites");
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  if (!user) return <p>You must be logged in to view favorites.</p>;

  return (
    <div>
      <h2>Your Favorite Pets</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {favorites.length > 0 ? (
          favorites.map((pet) => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <p>You haven't favorited any pets yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
