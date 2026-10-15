import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          ShopFlow
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Products</Link>
        </nav>

        {/* Cart Icon with Live Badge */}
        <Link
          to="/cart"
          className="relative p-2 text-gray-700 hover:text-blue-600 transition"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}