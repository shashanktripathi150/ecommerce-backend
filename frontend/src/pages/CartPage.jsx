import { Link } from 'react-router-dom';

// Temporary mock cart items to visualize layout
const MOCK_CART_ITEMS = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 4999,
    quantity: 1
  },
  {
    id: '4',
    name: 'Stainless Steel Insulated Tumbler (750ml)',
    price: 899,
    quantity: 2
  }
];

function CartPage() {
  const subtotal = MOCK_CART_ITEMS.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 1000 ? 0 : 99;
  const totalAmount = subtotal + shippingFee;

  if (MOCK_CART_ITEMS.length === 0) {
    return (
      <div className="cart-empty-container">
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2>Shopping Cart ({MOCK_CART_ITEMS.length} items)</h2>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items-list">
          {MOCK_CART_ITEMS.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
              </div>

              <div className="cart-item-quantity">
                <button className="btn-qty" disabled>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="btn-qty">+</button>
              </div>

              <div className="cart-item-total">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>

              <button className="btn-remove">Remove</button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
          </div>
          <hr />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <button className="btn-checkout">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;