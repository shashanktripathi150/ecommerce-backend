import { Link } from 'react-router-dom';

// Temporary mock products to build out our UI structure
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 4999,
    category: 'Electronics',
    rating: 4.5,
    inStock: true
  },
  {
    id: '2',
    name: 'Ergonomic Mechanical Keyboard',
    price: 3499,
    category: 'Electronics',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Minimalist Water-Resistant Backpack',
    price: 1899,
    category: 'Lifestyle',
    rating: 4.2,
    inStock: false
  },
  {
    id: '4',
    name: 'Stainless Steel Insulated Tumbler (750ml)',
    price: 899,
    category: 'Home & Kitchen',
    rating: 4.6,
    inStock: true
  }
];

function ProductListPage() {
  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h2>Featured Products</h2>
        <p>Showing {MOCK_PRODUCTS.length} curated essentials</p>
      </div>

      <div className="product-grid">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-placeholder">
              <span>{product.category}</span>
            </div>
            <div className="product-info">
              <span className="product-rating">⭐ {product.rating}</span>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
              
              <div className="card-actions">
                <Link to={`/products/${product.id}`} className="btn-secondary">
                  View Details
                </Link>
                <button 
                  className="btn-add-cart" 
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;