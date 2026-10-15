import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, cartItems, updateQty } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://shopflow-api-i4yd.onrender.com/api/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        console.error("Fetch detail error:", err);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-gray-500 font-medium">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 mb-4">{error || "Product not found."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  // Active cart check
  const cartItem = cartItems.find((ci) => ci._id === product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
        {/* Product Media with Fallback */}
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
          <img
            src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
              {product.category || 'General'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 text-sm text-amber-500 font-semibold">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating || 4.5}</span>
              </div>
              <span className="text-gray-400 font-normal">
                ({product.numReviews || 0} customer reviews)
              </span>
            </div>

            {/* Price & Stock */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-3xl font-black text-gray-900">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                (product.stock ?? 10) > 0
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}>
                {(product.stock ?? 10) > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-2">
              {product.description || 'High-performance product crafted for quality and daily use.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            {cartItem ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => updateQty(product._id, -1)}
                    className="p-3 hover:bg-gray-200 transition text-gray-700 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-base font-bold text-gray-900">
                    {cartItem.qty}
                  </span>
                  <button
                    onClick={() => updateQty(product._id, 1)}
                    className="p-3 hover:bg-gray-200 transition text-gray-700 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3.5 rounded-xl transition"
                >
                  View in Cart
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 pointer-events-none" />
                Add to Cart
              </button>
            )}

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-50 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" /> Free Dispatch
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 1-Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600" /> 7-Day Replacement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}