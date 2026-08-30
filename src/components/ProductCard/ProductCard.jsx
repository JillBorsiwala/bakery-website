export default function ProductCard({ product, onClick, variant = 'menu' }) {
  const hasAction = typeof onClick === 'function';
  const CardTag = hasAction ? 'button' : 'article';

  return (
    <CardTag
      type={hasAction ? 'button' : undefined}
      className={`product-card product-card--${variant} ${hasAction ? 'product-card--clickable' : ''}`}
      onClick={onClick}
    >
      {product.badge ? <span className="product-card__badge">{product.badge}</span> : null}
      <img className="product-card__image" src={product.image} alt={product.name} />
      <h4 className="product-card__title">{product.name}</h4>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__price">₹{product.price}</p>
      {hasAction ? <span className="product-card__hint">Tap to choose quantity</span> : null}
    </CardTag>
  );
}