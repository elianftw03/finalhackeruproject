import "../styles/Home.css";
import DogsImg from "../assets/Dogs.avif";
import CatsImg from "../assets/Cats.webp";
import RabbitsImg from "../assets/Rabbits.jpg";
import BirdsImg from "../assets/Birds.jpg";
import HorsesImg from "../assets/Horses.png";
import ReptilesImg from "../assets/Reptiles.jpg";

const petTypes = [
  { name: "Dogs", image: DogsImg },
  { name: "Cats", image: CatsImg },
  { name: "Rabbits", image: RabbitsImg },
  { name: "Birds", image: BirdsImg },
  { name: "Horses", image: HorsesImg },
  { name: "Reptiles", image: ReptilesImg },
];

function Home() {
  return (
    <div className="home-wrapper">
      <div className="main-content">
        <section className="hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Find your new best friend</h1>
              <p>Search adoptable pets from shelters across the country</p>
              <div className="search-bar">
                <input type="text" placeholder="Enter a city, state or zip" />
                <select>
                  {petTypes.map((pet) => (
                    <option key={pet.name}>{pet.name}</option>
                  ))}
                </select>
                <button>Search</button>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <h2>Browse by Pet Type</h2>
          <div className="category-grid">
            {petTypes.map((pet) => (
              <div className="category-card" key={pet.name}>
                <img src={pet.image} alt={pet.name} />
                <p>{pet.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
