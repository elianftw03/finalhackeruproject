import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Home.css";
import DogsImg from "../assets/Dogs.avif";
import CatsImg from "../assets/Cats.webp";
import RabbitsImg from "../assets/Rabbits.jpg";
import BirdsImg from "../assets/Birds.jpg";
import HorsesImg from "../assets/Horses.png";
import ReptilesImg from "../assets/Reptiles.jpg";

const petTypes = [
  { label: "Dogs", value: "Dog", image: DogsImg },
  { label: "Cats", value: "Cat", image: CatsImg },
  { label: "Rabbits", value: "Rabbit", image: RabbitsImg },
  { label: "Birds", value: "Bird", image: BirdsImg },
  { label: "Horses", value: "Horse", image: HorsesImg },
  { label: "Reptiles", value: "Reptile", image: ReptilesImg },
];

function Home() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [species, setSpecies] = useState(petTypes[0].value);

  const onSearch = () => {
    const q = term.trim();
    const params = new URLSearchParams();
    if (species) params.set("species", species);
    if (q) params.set("q", q);
    navigate(`/pets?${params.toString()}`);
  };

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
                  placeholder="Enter a city, breed or name"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                >
                  {petTypes.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <button onClick={onSearch}>Search</button>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <h2>Browse by Pet Type</h2>
          <div className="category-grid">
            {petTypes.map((pet) => (
              <Link
                className="category-card"
                key={pet.value}
                to={`/pets?species=${encodeURIComponent(pet.value)}`}
              >
                <img src={pet.image} alt={pet.label} />
                <p>{pet.label}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
