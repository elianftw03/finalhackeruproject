import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useToast } from "../components/Toast";
import "../styles/MyPets.css";
import "../styles/EmptyState.css";

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const { data } = await axios.get("/pets/my-pets");
      setPets(data);
    };
    run();
  }, []);

  const onDelete = async (id) => {
    try {
      await axios.delete(`/pets/${id}`);
      setPets((p) => p.filter((x) => x._id !== id));
      toast("Listing deleted");
    } catch {
      toast("Failed to delete", "err");
    }
  };

  if (pets.length === 0) {
    return (
      <div className="empty">
        <div className="empty-card">
          <h3>No listings yet</h3>
          <p>Add your first pet listing to get started.</p>
          <div className="actions">
            <Link to="/add-pet" className="btn btn-primary">
              Add Pet
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mypets-wrap">
      <div className="mypets-header">
        <h2 className="mypets-title">My Pets</h2>
        <div className="mypets-actions">
          <Link to="/add-pet" className="btn btn-primary">
            Add Pet
          </Link>
        </div>
      </div>

      <div className="mypets-grid">
        {pets.map((pet) => (
          <div key={pet._id} className="mypets-card">
            <img src={pet.image} alt={pet.name} className="mypets-media" />
            <div className="mypets-body">
              <div className="mypets-row">
                <strong>{pet.name}</strong>
                <span className={`badge badge--${pet.status}`}>
                  {pet.status}
                </span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>
                {pet.species} · {pet.age} yrs · {pet.breed || "Unknown"}
              </div>
              <div className="mypets-buttons">
                <Link to={`/pets/${pet._id}`} className="btn btn-icon">
                  View
                </Link>
                <Link to={`/pets/${pet._id}/edit`} className="btn btn-icon">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(pet._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
