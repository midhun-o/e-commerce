/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const productsMiddleware = require('../middleware/auth');

router.post('/getproducts', productsMiddleware.verifyToken, productsController.fetchProducts);
router.post('/getproducts/:id', productsMiddleware.verifyToken, productsController.fetchProductById);

module.exports = router;
