/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const productsModel = require('../models/products');

async function fetchProducts(req, res) {
    try {
        const result = await productsModel.fetchProducts();

        if (result.length > 0) {
            res.status(200).json({ products: result });
        } else {
            res.status(404).json({ message: 'No products to display' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function fetchProductById(req, res) {
    const productId = req.params.id;
    console.log(productId);
    try {
        const result = await productsModel.fetchProductById(productId);
        if (result) {
            res.status(200).json({ product: result });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function fetchCategoryAndProducts(req, res) {
    try {
        const result = await productsModel.fetchCategoryAndProducts();

        if (result.length > 0) {
            const categorizedProducts = {};
            result.forEach((item) => {
                const { category } = item;
                console.log(category);
                if (!categorizedProducts[category]) {
                    categorizedProducts[category] = [];
                }
                const { product, description, imageLink } = item;
                categorizedProducts[category].push({ product, description, imageLink });
            });
            res.status(200).json({ categories: categorizedProducts });
        } else {
            res.status(404).json({ message: 'No products to display' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { fetchProducts, fetchProductById, fetchCategoryAndProducts };
