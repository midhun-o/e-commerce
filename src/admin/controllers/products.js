/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
const adminModel = require('../models/products');

async function addProduct(req, res) {
    try {
        const {
            name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink,
        } = req.body;
        const result = await adminModel.addProduct(name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink);
        if (result) {
            res.status(200).json({ message: 'Item added successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const updatedDetails = req.body;
        console.log(updatedDetails, productId);
        const result = await adminModel.updateProduct(updatedDetails, productId);
        if (result) {
            res.status(200).json({ message: 'Item updated successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const result = await adminModel.deleteProduct(productId);
        if (result) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addProduct, updateProduct, deleteProduct };
