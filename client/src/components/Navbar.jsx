import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "/src/styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div className="nav-left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/pets">Pets</Link>
        <Link to="/about">About</Link>

        {user?.role === "shelter" && (
          <>
            <Link to="/add-pet">Add Pet</Link>
            <Link to="/my-pets">My Pets</Link>
          </>
        )}

        {user && <Link to="/favorites">Favorites</Link>}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
