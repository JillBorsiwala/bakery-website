import { useEffect, useMemo, useState } from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../hooks/useEscapeKey';

function getQuantityLabel(name) {
  if (name.endsWith('s')) {
    return name;
  }

  return `${name}s`;
}

export default function QuantityModal({ product, isOpen, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState('1');

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuantity('1');
    }
  }, [isOpen, product]);

  const isValid = useMemo(() => {
    const parsedQuantity = Number(quantity);
    return Number.isInteger(parsedQuantity) && parsedQuantity >= 1 && parsedQuantity <= 100;
  }, [quantity]);

  const handleConfirm = () => {
    if (!isValid) {
      return;
    }

    onConfirm(Number(quantity));
  };

  const handleChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '');

    if (digitsOnly === '') {
      setQuantity('');
      return;
    }

    const parsedValue = Math.min(100, Number(digitsOnly));
    setQuantity(String(parsedValue));
  };

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card quantity-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="quantity-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close quantity modal">
          ×
        </button>

        <h3 id="quantity-modal-title" className="modal-title">{product.name}</h3>
        <p className="modal-copy">How many {getQuantityLabel(product.name)} would you like to order?</p>

        <input
          className="modal-input quantity-input"
          type="number"
          min="1"
          max="100"
          inputMode="numeric"
          pattern="[0-9]*"
          value={quantity}
          onChange={handleChange}
          aria-label="Quantity"
        />

        <button className="quantity-confirm-btn" type="button" onClick={handleConfirm} disabled={!isValid} aria-label="Confirm quantity">
          ✓
        </button>
      </div>
    </div>
  );
}