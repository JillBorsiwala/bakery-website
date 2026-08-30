import { useEffect, useMemo, useState } from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../hooks/useEscapeKey';

export default function SearchModal({ isOpen, items, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      return [];
    }

    return items.filter((item) => (
      item.name.toLowerCase().includes(trimmed)
      || item.description.toLowerCase().includes(trimmed)
      || (item.category && item.category.toLowerCase().includes(trimmed))
    ));
  }, [items, query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="search-overlay active" onMouseDown={onClose}>
      <div className="search-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
        <button className="search-close" type="button" onClick={onClose} aria-label="Close search modal">&times;</button>
        <h2 id="search-modal-title">Search Our Bakery</h2>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for cakes, breads, pastries..."
          aria-label="Search bakery items"
        />

        <div className="search-results">
          {!query.trim() ? (
            <p className="no-results">Start typing to search for items...</p>
          ) : results.length === 0 ? (
            <>
              <p className="no-results">😕 No items found for <strong>{query}</strong></p>
              <p className="no-results search-results__hint">Try searching for cake, bread, pastry, or a specific name</p>
            </>
          ) : (
            results.map((item) => (
              <button key={item.id} className="search-result-item" type="button" onClick={() => onSelectResult(item)}>
                <h4>{item.name}</h4>
                <p>{item.description} — ₹{item.price}</p>
                {item.badge ? <p className="search-result-item__badge">{item.badge}</p> : null}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}