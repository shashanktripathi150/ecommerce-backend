import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ShoppingBag, Filter, ArrowUpDown } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductListPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://shopflow-api-i4yd.onrender.com/api/products');
        setProducts(res.data.products || res.data || []);
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  // Unique categories list extract karna
  const categories = useMemo(() => {
    const list = products.map((p) => p.category).filter(Boolean);
    return ['All', ...new Set(list)];
  }, [products]);

  // Filter aur sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Full Catalog</h1>
        <p className="text-gray-500 text-sm mt-1">
          Explore all tech, accessories, and essentials with live inventory.
        </p>
      </div>

      {/* Control Bar: Search, Category Filter, and Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="default">Default Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-24 text-gray-500 font-medium">
          Loading catalog from live server...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-base">No products match your current filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSortBy('default');
            }}
            className="mt-3 text-sm text-blue-600 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
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
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase text-blue-600 font-semibold tracking-wider">
                    {item.category}
                  </span>
                  <Link to={`/products/${item._id}`}>
                    <h3 className="font-semibold text-gray-900 text-sm mt-1 line-clamp-1 hover:text-blue-600">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-2 text-xs text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold">{item.rating || 4.5}</span>
                    <span className="text-gray-400">({item.numReviews || 0})</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition cursor-pointer"
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
    </div>
  );
}