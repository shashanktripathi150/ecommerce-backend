import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopFlow</h3>
          <p>Your one-stop destination for modern tech, fashion, and lifestyle essentials.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#help">Help & FAQs</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Returns & Refunds</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} ShopFlow. Built with React & Node.js.</p>
      </div>
    </footer>
  );
}

export default Footer;