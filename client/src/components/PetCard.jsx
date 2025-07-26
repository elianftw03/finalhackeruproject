import { Link } from "react-router-dom";
import { useState } from "react";

function PetCard({ pet }) {
  const [imgSrc, setImgSrc] = useState(pet.image);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={imgSrc}
        alt={pet.name}
        onError={() =>
          setImgSrc("https://via.placeholder.com/250x150?text=No+Image")
        }
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          marginBottom: "0.5rem",
          border: "1px solid #eee",
        }}
      />
      <h3>{pet.name}</h3>
      <p>
        {pet.species} · {pet.age} years old
      </p>
      <p>Shelter: {pet.createdBy?.name || "Unknown"}</p>
      <p>Location: {pet.createdBy?.location || "Not specified"}</p>
      <Link to={`/pets/${pet._id}`}>View Details</Link>
    </div>
  );
}

export default PetCard;
