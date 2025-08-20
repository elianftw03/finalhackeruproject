import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import BusinessDashboard from "./pages/BusinessDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/pets/:id" element={<PetDetails />} />
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["shelter", "admin"]}>
              <BusinessDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
