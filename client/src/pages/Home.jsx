import "../styles/Home.css";
import DogsImg from "../assets/Dogs.avif";
import CatsImg from "../assets/Cats.webp";
import RabbitsImg from "../assets/Rabbits.jpg";
import BirdsImg from "../assets/Birds.jpg";
import HorsesImg from "../assets/Horses.png";
import ReptilesImg from "../assets/Reptiles.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const petTypes = [
  { label: "Dogs", value: "Dog", image: DogsImg },
  { label: "Cats", value: "Cat", image: CatsImg },
  { label: "Rabbits", value: "Rabbit", image: RabbitsImg },
  { label: "Birds", value: "Bird", image: BirdsImg },
  { label: "Horses", value: "Horse", image: HorsesImg },
  { label: "Reptiles", value: "Reptile", image: ReptilesImg },
];

function Home() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState(petTypes[0].value);
  const navigate = useNavigate();

  function doSearch() {
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (type) params.set("type", type);
    navigate(`/pets?${params.toString()}`);
  }

  return (
    <div className="home-wrapper">
      <div className="main-content">
        <section className="hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Find your new best friend</h1>
              <p>Search adoptable pets from shelters across the country</p>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Enter a city, state or zip"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && doSearch()}
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  {petTypes.map((pet) => (
                    <option key={pet.value} value={pet.value}>
                      {pet.label}
                    </option>
                  ))}
                </select>
                <button onClick={doSearch}>Search</button>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <h2>Browse by Pet Type</h2>
          <div className="category-grid">
            {petTypes.map((pet) => (
              <div
                className="category-card"
                key={pet.value}
                onClick={() =>
                  navigate(`/pets?type=${encodeURIComponent(pet.value)}`)
                }
                role="button"
              >
                <img src={pet.image} alt={pet.label} />
                <p>{pet.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
