import ProductCard from '../ProductCard/ProductCard';

export default function Menu({ items, onSelectProduct, statusMessage = '' }) {
  return (
    <section id="menu" className="section menu-section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">Freshly baked every morning</p>

        <div className="menu-grid">
          {statusMessage ? (
            <p className="no-results" aria-live="polite">{statusMessage}</p>
          ) : (
            items.map((item) => (
              <ProductCard key={item.id} product={item} onClick={() => onSelectProduct(item)} variant="menu" />
            ))
          )}
        </div>
      </div>
    </section>
  );
}