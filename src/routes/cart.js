/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cart');
const authMiddleware = require('../middleware/auth');

router.post('/addtocart/:id', authMiddleware.verifyToken, cartController.addToCart);
router.post('/increment/:id', authMiddleware.verifyToken, cartController.incrementItem);
router.post('/decrement/:id', authMiddleware.verifyToken, cartController.decrementItem);

module.exports = router;
