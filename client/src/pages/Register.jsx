import { useState } from "react";
import axios from "../api/axiosInstance";
import { useToast } from "../components/Toast";
import "../styles/Auth.css";

function Register() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "regular",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      toast("Registered successfully");
      setForm({ name: "", email: "", password: "", role: "regular" });
    } catch {
      toast("Registration failed");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={onSubmit} className="auth-grid">
          <div className="auth-row">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
            />
          </div>
          <div className="auth-row">
            <select name="role" value={form.role} onChange={onChange}>
              <option value="regular">Regular</option>
              <option value="shelter">Shelter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="auth-row">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div className="auth-row">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <div className="auth-actions">
            <button type="submit" className="btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
