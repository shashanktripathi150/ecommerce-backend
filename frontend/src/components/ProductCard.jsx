import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const {
    _id,
    name,
    category,
    price,
    rating = 0,
    numReviews = 0,
    imageUrl,
    image,
    stock = 0,
  } = product;

  // Fallback placeholder image if none provided
  const displayImage =
    imageUrl || image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Clickable Image linking to Product Details */}
      <Link to={`/products/${_id}`} className="relative aspect-square bg-slate-50 overflow-hidden block">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Out of stock badge if stock is 0 */}
        {stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            {category || 'General'}
          </span>

          {/* Product Title */}
          <Link to={`/products/${_id}`}>
            <h3 className="font-semibold text-slate-800 text-sm mt-2 line-clamp-1 hover:text-blue-600 transition" title={name}>
              {name}
            </h3>
          </Link>

          {/* Rating & Review Counter */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-slate-700">{rating}</span>
            <span className="text-slate-400">({numReviews} reviews)</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ₹{Number(price).toLocaleString('en-IN')}
          </span>
          
          <button
            type="button"
            className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white active:scale-95 transition-all cursor-pointer"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}