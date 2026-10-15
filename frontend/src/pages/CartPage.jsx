import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart, totalPrice, totalCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
        Shopping Cart ({totalCount} {totalCount === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Thumbnail + Name */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <img
                    src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1 pr-2">
                  <span className="text-[11px] font-semibold tracking-wider text-blue-600 uppercase block mb-1">
                    {item.category || 'Tech'}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Quantity Counter + Subtotal + Delete (Separated without overlap) */}
              <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Quantity Box */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQty(item._id, -1)}
                    className="p-2 hover:bg-gray-200 transition text-gray-700 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-bold text-gray-900">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item._id, 1)}
                    className="p-2 hover:bg-gray-200 transition text-gray-700 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <span className="block font-bold text-gray-900 text-base">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Trash Button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-gray-400 hover:text-rose-600 transition cursor-pointer"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary (4 Columns Sticky on Desktop) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({totalCount} items)</span>
                <span className="font-semibold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span className="font-semibold text-gray-900">₹0</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-blue-600 text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Order placed successfully for ₹${totalPrice.toLocaleString('en-IN')}!`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}