import { useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import "../styles/forms.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "regular",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/register", form);
      login(data);
      toast("Account created");
      navigate("/");
    } catch {
      setError("Registration failed");
      toast("Registration failed", "err");
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-card">
        <h2 className="form-title">Create Account</h2>
        <form onSubmit={onSubmit} className="form-grid">
          <input
            className="input"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
          />
          <select
            className="select"
            name="role"
            value={form.role}
            onChange={onChange}
          >
            <option value="regular">Regular</option>
            <option value="shelter">Shelter</option>
          </select>
          <input
            className="input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
          {error && <div className="form-error">{error}</div>}
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
