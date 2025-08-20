import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PetList from "./pages/PetList";
import PetDetails from "./pages/PetDetails";
import AddPet from "./pages/AddPet";
import MyPets from "./pages/MyPets";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import EditPet from "./pages/EditPet";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/layout.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route
            path="/pets/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["shelter", "admin"]}>
                <EditPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-pet"
            element={
              <ProtectedRoute allowedRoles={["shelter", "admin"]}>
                <AddPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-pets"
            element={
              <ProtectedRoute allowedRoles={["shelter", "admin"]}>
                <MyPets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute allowedRoles={["regular", "shelter", "admin"]}>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
