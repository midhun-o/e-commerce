/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const productsMiddleware = require('../middleware/auth');

router.get('/getproducts', productsController.fetchProducts);
router.get('/getproducts/:id', productsMiddleware.verifyToken, productsController.fetchProductById);

module.exports = router;
