import { useEffect, useMemo, useState } from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../hooks/useEscapeKey';

export default function CustomerModal({
  isOpen,
  onClose,
  onConfirm,
  totalCost,
  items,
  submitError = '',
  isSubmitting = false,
}) {
  const [customerName, setCustomerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      setCustomerName('');
      setErrorMessage('');
    }
  }, [isOpen]);

  const isValid = useMemo(() => /^[A-Za-z0-9 ]{1,20}$/.test(customerName.trim()), [customerName]);

  const handleChange = (event) => {
    const value = event.target.value.replace(/[^A-Za-z0-9 ]/g, '').slice(0, 20);
    setCustomerName(value);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleConfirm = async () => {
    const trimmedName = customerName.trim();

    if (!trimmedName) {
      setErrorMessage('Customer name is required.');
      return;
    }

    if (!isValid) {
      setErrorMessage('Use letters, numbers, and spaces only, up to 20 characters.');
      return;
    }

    await onConfirm({
      customerName: trimmedName,
      items,
      totalCost,
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card customer-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="customer-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close customer modal">
          ×
        </button>

        <h3 id="customer-modal-title" className="modal-title">Customer Name</h3>

        <input
          className={`modal-input customer-input ${errorMessage ? 'modal-input--error' : ''}`}
          type="text"
          maxLength="20"
          value={customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          aria-label="Customer name"
        />

        {errorMessage ? <p className="modal-error">{errorMessage}</p> : null}
        {submitError ? <p className="modal-error">{submitError}</p> : null}

        <div className="customer-actions">
          <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" type="button" onClick={handleConfirm} disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}