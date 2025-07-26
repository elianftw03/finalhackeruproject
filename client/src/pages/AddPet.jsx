import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AddPet.css";

function AddPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    species: "",
    age: "",
    breed: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/pets", form);
      navigate("/pets");
    } catch (err) {
      setError("Failed to add pet.");
    }
  };

  return (
    <div className="add-pet-container">
      <h2>Add a New Pet</h2>
      <form className="add-pet-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="species"
          placeholder="Species (Dog, Cat...)"
          value={form.species}
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="age"
          type="number"
          placeholder="Age (in years)"
          value={form.age}
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <textarea
          className="textarea-field"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Add Pet
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddPet;
