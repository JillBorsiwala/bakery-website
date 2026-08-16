export default function Hero({ onExploreMenu }) {
  return (
    <section id="home" className="section home-section">
      <div className="home-content">
        <h1 className="home-title">Welcome to <span>Just Yummy</span></h1>
        <p className="home-subtitle">Where every bite is a piece of happiness 🍰</p>
        <p className="home-description">Freshly baked with love, using the finest ingredients. From our oven to your heart.</p>
        <button type="button" className="cta-btn" onClick={onExploreMenu}>Explore Our Menu</button>
      </div>

      <div className="home-image">
        <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200" alt="Fresh bakery display" />
      </div>
    </section>
  );
}