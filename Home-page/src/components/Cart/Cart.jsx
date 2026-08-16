import { useCart } from '../../context/CartContext';
import { calculateTotal, formatCurrency } from '../../utils/calculateTotal';

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h4a.75.75 0 0 1 0 1.5h-1.1l-.82 11.1A2.75 2.75 0 0 1 14.34 20H9.66a2.75 2.75 0 0 1-2.74-2.4L6.1 6.5H5a.75.75 0 0 1 0-1.5h4V3.75Zm1.5 1.25h3V4a.25.25 0 0 0-.25-.25h-2.5A.25.25 0 0 0 10.5 4v1Z" />
    </svg>
  );
}

export default function Cart({ onSubmitOrder }) {
  const { cartItems, removeItem } = useCart();
  const totalCost = calculateTotal(cartItems);

  return (
    <section className="section cart-section">
      <div className="container cart-container">
        <div className="cart-header">
          <h2 className="section-title">Order Summary</h2>
          <p className="section-subtitle">Review your selected items before placing the order</p>
        </div>

        <div className="cart-panel">
          <div className="cart-table-wrap">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th aria-label="Delete"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr className="cart-empty-row">
                    <td colSpan="4">Your cart is empty. Click a menu item to add it here.</td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="cart-item-name">{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                      <td>
                        <button className="cart-delete-btn" type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="cart-total-label">Total Cost</td>
                  <td colSpan="2" className="cart-total-value">{formatCurrency(totalCost)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            type="button"
            className="submit-order-btn"
            onClick={onSubmitOrder}
            disabled={cartItems.length === 0}
          >
            Submit Order
          </button>
        </div>
      </div>
    </section>
  );
}