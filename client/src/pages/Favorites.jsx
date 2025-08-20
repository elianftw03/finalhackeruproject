import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useToast } from "../components/Toast";
import "../styles/Favorites.css";
import "../styles/EmptyState.css";

export default function Favorites() {
  const [pets, setPets] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const { data } = await axios.get("/pets/favorites");
      setPets(data);
    };
    run();
  }, []);

  const toggle = async (id) => {
    try {
      await axios.patch(`/pets/${id}/favorite`);
      setPets((p) => p.filter((x) => x._id !== id));
      toast("Removed from favorites");
    } catch {
      toast("Failed to update favorites", "err");
    }
  };

  if (pets.length === 0) {
    return (
      <div className="empty">
        <div className="empty-card">
          <h3>No favorites yet</h3>
          <p>Tap the heart on a pet to save it here.</p>
          <div className="actions">
            <Link to="/pets" className="btn">
              Browse pets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favs-wrap">
      <h2 className="favs-title">Favorites</h2>
      <div className="favs-grid">
        {pets.map((pet) => (
          <div key={pet._id} className="fav-card">
            <img src={pet.image} alt={pet.name} className="fav-media" />
            <div className="fav-body">
              <div className="fav-row">
                <strong>{pet.name}</strong>
                <span className={`badge badge--${pet.status}`}>
                  {pet.status}
                </span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>
                {pet.species} · {pet.age} yrs · {pet.breed || "Unknown"}
              </div>
              <div className="fav-actions">
                <Link to={`/pets/${pet._id}`} className="btn btn-icon">
                  View
                </Link>
                <button
                  className="btn btn-icon"
                  onClick={() => toggle(pet._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
