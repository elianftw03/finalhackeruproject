import "../styles/About.css";

export default function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-inner">
          <h1>About PetPal</h1>
          <p>
            Helping people connect with adoptable pets in a simple, friendly
            way.
          </p>
        </div>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <h3>Our mission</h3>
          <p>
            Make adoption easier. PetPal brings shelters and people together
            with clear listings, simple tools, and a clean experience that works
            on any device.
          </p>
        </div>

        <div className="about-card">
          <h3>What you can do</h3>
          <ul className="about-list">
            <li>Browse pets by type and city</li>
            <li>See full details and contact info</li>
            <li>Save favorites to compare later</li>
            <li>Shelters can add, edit, and manage listings</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>How it works</h3>
          <p>
            Shelters create listings with photos and details. Regular users
            browse and favorite pets. When you find a match, use the contact
            details to reach the shelter and continue the process offline.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-inner">
          <div>
            <h2>Built for the FS Web Final Project</h2>
            <p>
              Clean code, role‑based access, full CRUD for shelters, and a
              simple UI for adopters.
            </p>
          </div>
          <div className="about-meta">
            <div className="meta-item">
              <span className="meta-num">3</span>
              <span className="meta-label">Roles</span>
            </div>
            <div className="meta-item">
              <span className="meta-num">7</span>
              <span className="meta-label">Pages</span>
            </div>
            <div className="meta-item">
              <span className="meta-num">100%</span>
              <span className="meta-label">Responsive</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <div className="about-contact-card">
          <h3>Contact</h3>
          <p>Have feedback or found a bug? Let us know.</p>
          <div className="about-contact-grid">
            <div>
              <div className="label">Email</div>
              <div className="value">shelter@example.com</div>
            </div>
            <div>
              <div className="label">Phone</div>
              <div className="value">050‑000‑0000</div>
            </div>
            <div>
              <div className="label">Location</div>
              <div className="value">Tel Aviv, Israel</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
