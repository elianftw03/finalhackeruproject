import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

function PetCard({ pet, onFavoriteChanged }) {
  const [imgSrc, setImgSrc] = useState(pet.image);
  const [faving, setFaving] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(Boolean(pet._isFav));
  }, [pet]);

  async function toggleFavorite() {
    try {
      setFaving(true);
      await axios.patch(`/pets/${pet._id}/favorite`);
      const next = !isFav;
      setIsFav(next);
      onFavoriteChanged && onFavoriteChanged(pet._id, next);
    } finally {
      setFaving(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 12,
      }}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <img
          src={imgSrc}
          alt={pet.name}
          onError={() =>
            setImgSrc("https://via.placeholder.com/400x250?text=No+Image")
          }
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            marginBottom: "0.5rem",
            border: "1px solid #eee",
            borderRadius: 8,
          }}
        />
        <button
          disabled={faving}
          onClick={toggleFavorite}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            border: "1px solid #eee",
            borderRadius: 20,
            padding: "6px 10px",
            background: isFav ? "#ffeff0" : "#fff",
            cursor: "pointer",
          }}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>

      <h3 style={{ margin: "4px 0" }}>{pet.name}</h3>
      <p style={{ margin: 0 }}>
        {pet.species} · {pet.age} years old
      </p>
      <p style={{ margin: "4px 0", opacity: 0.8 }}>
        Shelter: {pet.createdBy?.name || "Unknown"}
      </p>
      <p style={{ margin: "4px 0", opacity: 0.8 }}>
        Location: {pet.createdBy?.location || "Not specified"}
      </p>
      <Link to={`/pets/${pet._id}`} style={{ marginTop: 8 }}>
        View Details
      </Link>
    </div>
  );
}

export default PetCard;
