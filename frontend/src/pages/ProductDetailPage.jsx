import { useParams, Link } from 'react-router-dom';

// Same mock database for now
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 4999,
    category: 'Electronics',
    rating: 4.5,
    description: 'Active noise-cancellation with up to 35 hours of battery life and ultra-comfortable memory foam earcups.',
    inStock: true
  },
  {
    id: '2',
    name: 'Ergonomic Mechanical Keyboard',
    price: 3499,
    category: 'Electronics',
    rating: 4.8,
    description: 'Hot-swappable tactile switches with customizable RGB backlighting and durable PBT keycaps.',
    inStock: true
  },
  {
    id: '3',
    name: 'Minimalist Water-Resistant Backpack',
    price: 1899,
    category: 'Lifestyle',
    rating: 4.2,
    description: 'Compact urban backpack with dedicated 15.6-inch laptop compartment and hidden anti-theft zipper pocket.',
    inStock: false
  },
  {
    id: '4',
    name: 'Stainless Steel Insulated Tumbler (750ml)',
    price: 899,
    category: 'Home & Kitchen',
    rating: 4.6,
    description: 'Double-wall vacuum insulation keeps liquids cold for 24 hours or piping hot for 12 hours.',
    inStock: true
  }
];

function ProductDetailPage() {
  const { id } = useParams();

  // Find the product matching the URL parameter
  const product = MOCK_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Link to="/products" className="back-link">&larr; Back to all products</Link>

      <div className="detail-layout">
        <div className="detail-image-box">
          <span>{product.category} Image</span>
        </div>

        <div className="detail-info">
          <span className="category-pill">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-rating">Rating: ⭐ {product.rating} / 5</p>
          <p className="detail-price">₹{product.price.toLocaleString('en-IN')}</p>
          
          <div className="detail-status">
            Status: <strong className={product.inStock ? 'text-in-stock' : 'text-out-stock'}>
              {product.inStock ? 'In Stock' : 'Currently Unavailable'}
            </strong>
          </div>

          <p className="detail-description">{product.description}</p>

          <button className="btn-primary-large" disabled={!product.inStock}>
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;