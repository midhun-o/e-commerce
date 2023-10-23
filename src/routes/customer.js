/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const customerController = require('../controllers/customer');
const authMiddleware = require('../middleware/auth');

router.post('/addtocart/:id', authMiddleware.verifyToken, customerController.addToCart);
router.post('/increment/:id', authMiddleware.verifyToken, customerController.incrementItem);
router.post('/decrement/:id', authMiddleware.verifyToken, customerController.decrementItem);
router.get('/viewcart/', authMiddleware.verifyToken, customerController.viewCart);
router.post('/removecartitem/:id', authMiddleware.verifyToken, customerController.removeCartItem);
router.post('/checkout/', authMiddleware.verifyToken, customerController.checkout);
router.post('/addtowishlist/:id', authMiddleware.verifyToken, customerController.addToWishlist);
router.get('/wishlist/', authMiddleware.verifyToken, customerController.viewWishlist);
router.post('/removewishlist/:id', authMiddleware.verifyToken, customerController.removeWishlistItem);

module.exports = router;
