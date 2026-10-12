import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public catalog routes & Admin create
router.get('/', getProducts);
router.post('/', protect, admin, createProduct);

// Authenticated user review route (Place BEFORE or alongside single product ID)
router.post('/:id/reviews', protect, createProductReview);

// Single product CRUD
router.get('/:id', getProductById);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;