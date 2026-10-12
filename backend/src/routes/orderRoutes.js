import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Order creation & Admin list all orders
router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

// User orders
router.get('/myorders', protect, getMyOrders);

// Single order operations
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin-only order fulfillment
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;