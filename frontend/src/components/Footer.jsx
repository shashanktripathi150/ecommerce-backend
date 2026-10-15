import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Mission Statement */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Shop<span className="text-blue-500">Flow</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your one-stop destination for modern tech, fashion, and lifestyle essentials.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-400 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#help" className="hover:text-blue-400 transition">
                  Help & FAQs
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-blue-400 transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-blue-400 transition">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Divider */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {currentYear} ShopFlow. Built with React & Node.js.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;