import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} Elian Davidov || PetPal</div>
        <div>Built for the HackerU FS Web Final Project</div>
      </div>
    </footer>
  );
}

export default Footer;
