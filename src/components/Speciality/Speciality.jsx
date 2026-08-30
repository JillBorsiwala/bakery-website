import ProductCard from '../ProductCard/ProductCard';

export default function Speciality({ items, onSelectProduct, statusMessage = '' }) {
  return (
    <section id="speciality" className="section speciality-section">
      <div className="container">
        <h2 className="section-title">Our Specialities</h2>
        <p className="section-subtitle">Signature creations you'll love</p>

        <div className="speciality-grid">
          {statusMessage ? (
            <p className="no-results" aria-live="polite">{statusMessage}</p>
          ) : (
            items.map((item) => (
              <ProductCard key={item.id} product={item} onClick={() => onSelectProduct(item)} variant="speciality" />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
