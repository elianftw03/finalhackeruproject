import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import "/src/styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast("Logged out");
    navigate("/");
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className={open ? "nav-open" : ""}>
      <div className="nav-left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="PetPal Logo" />
        </Link>
      </div>

      <button
        className={`burger ${open ? "is-open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-right ${open ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/pets" onClick={closeMenu}>
          Pets
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        {user?.role === "regular" && (
          <Link to="/favorites" onClick={closeMenu}>
            Favorites
          </Link>
        )}

        {(user?.role === "shelter" || user?.role === "admin") && (
          <>
            <Link to="/add-pet" onClick={closeMenu}>
              Add Pet
            </Link>
            <Link to="/my-pets" onClick={closeMenu}>
              My Pets
            </Link>
          </>
        )}

        {!user && (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
        {!user && (
          <Link to="/register" onClick={closeMenu}>
            Register
          </Link>
        )}

        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
