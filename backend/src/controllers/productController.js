import Product from '../models/Product.js';

// @desc    Fetch all products with search, filtering & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 8;
    const page = Number(req.query.pageNumber) || 1;

    // Search filter: Case-insensitive keyword search on product name
    const keywordFilter = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i'
          }
        }
      : {};

    // Category filter: Exact match if provided
    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};

    // Combine both filters
    const filter = { ...keywordFilter, ...categoryFilter };

    // Count total documents matching query for pagination metadata
    const count = await Product.countDocuments(filter);

    // Fetch paginated slice of documents
    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error while fetching products', 
      error: error.message 
    });
  }
};

// @desc    Fetch a single product by its unique MongoDB _id
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ 
      message: 'Resource not found or invalid Object ID format', 
      error: error.message 
    });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, category, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      stock,
      numReviews: 0,
      rating: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error creating product', 
      error: error.message 
    });
  }
};

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error updating product', 
      error: error.message 
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product successfully removed from catalog' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error deleting product', 
      error: error.message 
    });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the authenticated user already submitted a review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed by this user' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Recalculate average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review successfully added' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while submitting review',
      error: error.message
    });
  }
};