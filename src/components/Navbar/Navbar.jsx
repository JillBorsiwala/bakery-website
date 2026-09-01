import { useState, useEffect } from 'react';

export default function Navbar({ isMobileOpen, onToggleMobile, onNavigate, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (event, targetId) => {
    event.preventDefault();
    onNavigate(targetId);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <button className="nav-logo" type="button" onClick={() => onNavigate('home')} aria-label="Go to home section">
          <span className="logo-icon">🧁</span>
          <span className="logo-text">Just Yummy</span>
        </button>

        <ul className={`nav-links ${isMobileOpen ? 'open' : ''}`} id="navLinks">
          <li><a href="#home" className="nav-link" onClick={(event) => handleLinkClick(event, 'home')}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={(event) => handleLinkClick(event, 'about')}>About</a></li>
          <li><a href="#menu" className="nav-link" onClick={(event) => handleLinkClick(event, 'menu')}>Menu</a></li>
          <li><a href="#speciality" className="nav-link" onClick={(event) => handleLinkClick(event, 'speciality')}>Speciality</a></li>
          <li><a href="#contact" className="nav-link" onClick={(event) => handleLinkClick(event, 'contact')}>Contact</a></li>
          <li>
            <button className="search-btn" type="button" onClick={onOpenSearch} aria-label="Search">
              🔍
            </button>
          </li>
        </ul>

        <button className="hamburger" type="button" onClick={onToggleMobile} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}