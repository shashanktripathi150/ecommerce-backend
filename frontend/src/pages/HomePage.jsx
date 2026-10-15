import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // ?limit=20 add karne se backend saare 8 products return karega
        const res = await axios.get('https://shopflow-api-i4yd.onrender.com/api/products?limit=20');
        const allItems = res.data.products || res.data || [];
        setProducts(allItems);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-md">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Upgrade Your Tech & Lifestyle
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base mb-8">
          Discover top-tier gadgets, accessories, and fashion at unbeatable prices.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition shadow-sm"
        >
          Explore All Products
        </Link>
      </section>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <Truck className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-bold text-gray-900 mb-1">Fast Delivery</h3>
          <p className="text-sm text-gray-500">Lightning-fast delivery across all major metro cities.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-bold text-gray-900 mb-1">Secure Payments</h3>
          <p className="text-sm text-gray-500">Protected checkout with end-to-end encrypted transactions.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-bold text-gray-900 mb-1">Easy Returns</h3>
          <p className="text-sm text-gray-500">Hassle-free 7-day replacement and refund policy.</p>
        </div>
      </div>

      {/* 8 Products Grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products ({products.length})
          </h2>
          <Link to="/products" className="text-blue-600 hover:underline text-sm font-semibold">
            View All &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500 font-medium">
            Loading products from live cloud server...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Image Section */}
                <Link to={`/products/${item._id}`} className="aspect-square bg-gray-50 overflow-hidden block">
                  <img
                    src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                </Link>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      {item.category || 'General'}
                    </span>
                    <Link to={`/products/${item._id}`}>
                      <h3 className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition leading-snug line-clamp-2 min-h-[2.5rem]">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating || 4.5}</span>
                      <span className="text-gray-400 font-normal">({item.numReviews || 0})</span>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 font-medium">Price</span>
                      <span className="text-base font-bold text-gray-900 whitespace-nowrap">
                        ₹{Number(item.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition cursor-pointer flex-shrink-0"
                      title="Add to cart"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4 pointer-events-none" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}