import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useToast } from "../components/Toast";
import "/src/styles/PetCard.css";

function PetCard({ pet }) {
  const [imgSrc, setImgSrc] = useState(pet.image);
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const { toast } = useToast();

  const toggleFavorite = async () => {
    try {
      await axios.patch(`/pets/${pet._id}/favorite`);
      toast("Updated favorites");
    } catch {
      toast("Failed to update favorites", "err");
    }
  };

  return (
    <div className="pet-card">
      <img
        src={imgSrc}
        alt={pet.name}
        onError={() =>
          setImgSrc("https://via.placeholder.com/600x400?text=No+Image")
        }
        className="pet-media"
      />
      <div className="pet-body">
        <div className="pet-title">
          <h3>{pet.name}</h3>
          {pet.status && (
            <span className={`badge badge--${pet.status}`}>{pet.status}</span>
          )}
        </div>
        <div className="pet-meta">
          {pet.species} · {pet.age} yrs · {pet.breed || "Unknown"}
        </div>
        <div className="pet-meta">City: {pet.city || "Not specified"}</div>
        <div className="pet-row">
          <div className="pet-actions">
            <Link to={`/pets/${pet._id}`} className="view">
              View
            </Link>
            {role === "regular" && (
              <button className="heart" onClick={toggleFavorite}>
                ♥
              </button>
            )}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            {pet.createdBy?.name || "Shelter"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
