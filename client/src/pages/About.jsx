function About() {
  return (
    <div>
      <h2>About PetPal</h2>
      <p>
        PetPal is a full-stack web application built as part of a final project
        for a web development bootcamp. It allows users to explore adoptable
        pets, save their favorites, and (if authorized) add pets for adoption.
      </p>
      <h3>Core Features:</h3>
      <ul>
        <li>Login/Register with JWT Authentication</li>
        <li>Role-based access for regular users and shelter admins</li>
        <li>CRUD operations for pet listings</li>
        <li>Favorites system for saving pets</li>
        <li>Responsive UI and protected routes</li>
      </ul>
      <h3>Tech Stack:</h3>
      <ul>
        <li>Frontend: React + Vite + Axios + Context API</li>
        <li>Backend: Node.js + Express + MongoDB + Mongoose + JWT</li>
      </ul>
      <p>
        This project was developed by [Your Name] as part of the Full Stack Web
        Bootcamp 2025.
      </p>
    </div>
  );
}

export default About;
