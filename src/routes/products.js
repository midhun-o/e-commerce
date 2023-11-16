/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const productsMiddleware = require('../middleware/auth');

router.get('/getproducts', productsMiddleware.verifyToken, productsController.fetchProducts);
router.get('/search', productsMiddleware.verifyToken, productsController.searchProduct);
router.get('/getproducts/:id', productsMiddleware.verifyToken, productsController.fetchProductById);
router.get('/getcategoriesandproduct', productsMiddleware.verifyToken, productsController.fetchCategoryAndProducts);
router.get('/getcategories', productsMiddleware.verifyToken, productsController.getCategories);

module.exports = router;
