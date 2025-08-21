import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import "../styles/Auth.css";

function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", form);
      const token = res?.data?.token;
      const user = res?.data?.user;
      if (!token || !user) {
        toast("Login failed");
        return;
      }
      login(token, user);
      toast("Logged in");
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Login failed";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={onSubmit} className="auth-grid">
          <div className="auth-row">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="auth-row">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="auth-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
