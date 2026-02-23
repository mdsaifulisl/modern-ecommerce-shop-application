const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, veryfyOrder} = require('../controllers/orderController');
// const { protect, admin } = require('../middleware/authMiddleware'); 
// Un-comment the above if you have authentication set up

// @desc    Create new order
// @route   POST /api/orders
router.post('/', createOrder);



// @desc    Get all orders (Admin only)
// @route   GET /api/orders
router.get('/', getOrders);


// @desc    Update order to delivered (Admin only)
// @route   PUT /api/orders/:id/deliver
router.put('/:id/status', updateOrderStatus);


// @desc    Update order to delivered (Admin only)
// @route   PUT /api/orders/:id/deliver
// router.put('/:id/deliver', updateOrderToDelivered);

// veryfyOrder
router.get('/verify/:orderId', veryfyOrder);
module.exports = router;