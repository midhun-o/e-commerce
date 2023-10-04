/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const productsMiddleware = require('../middleware/auth');

router.get('/getproducts', productsMiddleware.verifyToken, productsController.fetchProducts);
router.get('/getproducts/:id', productsMiddleware.verifyToken, productsController.fetchProductById);
router.get('/getcategories', productsMiddleware.verifyToken, productsController.fetchCategoryAndProducts);

module.exports = router;
