import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useToast } from "../components/Toast";
import "../styles/PetDetails.css";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const { data } = await axios.get(`/pets/${id}`);
      setPet(data);
    };
    run();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      await axios.patch(`/pets/${id}/favorite`);
      toast("Updated favorites");
    } catch {
      toast("Failed to update favorites", "err");
    }
  };

  if (!pet) return <div className="details-wrap">Loading...</div>;

  return (
    <div className="details-wrap">
      <div className="details-grid">
        <div className="details-card">
          <img src={pet.image} alt={pet.name} className="details-media" />
          <div className="details-body">
            <h1 className="details-title">{pet.name}</h1>
            <div className="details-meta">
              {pet.species} • {pet.breed} • {pet.age} yrs • {pet.gender} •{" "}
              {pet.size}
            </div>
            <div className="details-meta">City: {pet.city}</div>
            <div className="details-meta">
              {pet.vaccinated ? "Vaccinated" : "Not vaccinated"} •{" "}
              {pet.neutered ? "Neutered" : "Not neutered"}
            </div>
            <p style={{ whiteSpace: "pre-wrap" }}>{pet.description}</p>
            {role === "regular" && (
              <button className="fav-btn" onClick={toggleFavorite}>
                Add/Remove Favorite
              </button>
            )}
          </div>
        </div>

        <div className="details-panel">
          <div
            className={`badge badge--${pet.status}`}
            style={{ width: "max-content" }}
          >
            {pet.status}
          </div>
          <div>
            <strong>Contact:</strong> {pet.contactName}
          </div>
          <div>{pet.contactPhone}</div>
          <div>{pet.contactEmail}</div>
          <div>
            <strong>Shelter:</strong> {pet.createdBy?.name || "Shelter"}
          </div>
        </div>
      </div>
    </div>
  );
}
