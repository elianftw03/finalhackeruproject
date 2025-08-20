import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useToast } from "../components/Toast";
import "../styles/forms.css";

export default function EditPet() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: 0,
    gender: "Male",
    size: "Medium",
    image: "",
    description: "",
    city: "",
    status: "available",
    vaccinated: false,
    neutered: false,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await axios.get(`/pets/${id}`);
        setForm({
          name: data.name || "",
          species: data.species || "Dog",
          breed: data.breed || "",
          age: data.age || 0,
          gender: data.gender || "Male",
          size: data.size || "Medium",
          image: data.image || "",
          description: data.description || "",
          city: data.city || "",
          status: data.status || "available",
          vaccinated: !!data.vaccinated,
          neutered: !!data.neutered,
          contactName: data.contactName || "",
          contactPhone: data.contactPhone || "",
          contactEmail: data.contactEmail || "",
        });
        setLoading(false);
      } catch {
        setError("Failed to load pet");
        toast("Failed to load pet", "err");
      }
    };
    run();
  }, [id, toast]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/pets/${id}`, form);
      toast("Changes saved");
      navigate("/my-pets");
    } catch {
      setError("Failed to update pet");
      toast("Failed to update pet", "err");
    }
  };

  if (loading)
    return (
      <div className="form-wrap">
        <div className="form-card">Loading...</div>
      </div>
    );

  return (
    <div className="form-wrap">
      <div className="form-card">
        <h2 className="form-title">Edit Pet</h2>
        <form onSubmit={onSubmit} className="form-grid">
          <input
            className="input"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
          />
          <input
            className="input"
            name="breed"
            placeholder="Breed"
            value={form.breed}
            onChange={onChange}
          />
          <select
            className="select"
            name="species"
            value={form.species}
            onChange={onChange}
          >
            <option>Dog</option>
            <option>Cat</option>
            <option>Rabbit</option>
            <option>Bird</option>
            <option>Horse</option>
            <option>Reptile</option>
          </select>
          <input
            className="input"
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={onChange}
          />
          <select
            className="select"
            name="gender"
            value={form.gender}
            onChange={onChange}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          <select
            className="select"
            name="size"
            value={form.size}
            onChange={onChange}
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <input
            className="input"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={onChange}
          />
          <select
            className="select"
            name="status"
            value={form.status}
            onChange={onChange}
          >
            <option value="available">available</option>
            <option value="pending">pending</option>
            <option value="adopted">adopted</option>
          </select>
          <input
            className="input"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={onChange}
          />
          <div className="form-grid full">
            <textarea
              className="textarea"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={onChange}
            />
          </div>
          <label className="checkbox">
            <input
              type="checkbox"
              name="vaccinated"
              checked={form.vaccinated}
              onChange={onChange}
            />
            Vaccinated
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              name="neutered"
              checked={form.neutered}
              onChange={onChange}
            />
            Neutered
          </label>
          <input
            className="input"
            name="contactName"
            placeholder="Contact Name"
            value={form.contactName}
            onChange={onChange}
          />
          <input
            className="input"
            name="contactPhone"
            placeholder="Contact Phone"
            value={form.contactPhone}
            onChange={onChange}
          />
          <input
            className="input"
            name="contactEmail"
            placeholder="Contact Email"
            value={form.contactEmail}
            onChange={onChange}
          />
          {error && <div className="form-error">{error}</div>}
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => navigate("/my-pets")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
