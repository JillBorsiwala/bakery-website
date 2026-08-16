export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-grid">
          <div className="about-text">
            <h3>Our Story</h3>
            <p>Just Yummy started in a small kitchen with a big dream — to bring the warmth and comfort of homemade baked goods to everyone. Every recipe is crafted with care, using time-honored techniques and the finest ingredients.</p>
            <p>We believe that baking is an art, and every creation tells a story of passion, dedication, and love.</p>
            <h3>Our Mission</h3>
            <p>To create moments of joy through delicious, beautiful, and wholesome baked goods that bring people together.</p>
          </div>

          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200" alt="Baking process" />
          </div>
        </div>
      </div>
    </section>
  );
}