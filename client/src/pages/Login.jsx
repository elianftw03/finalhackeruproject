import { useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import "../styles/forms.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", form);
      login(data);
      toast("Welcome back");
      navigate("/");
    } catch {
      setError("Login failed");
      toast("Login failed", "err");
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <form onSubmit={onSubmit} className="form-grid full">
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
