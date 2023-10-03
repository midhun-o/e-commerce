/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
const cartModel = require('../models/cart');
const getUserId = require('../common/getUserId');

async function isPresent(userId, productId) {
    try {
        const result = await cartModel.isPresent(userId, productId);
        return result;
    } catch (err) {
        console.error('DB retrieve error', err);
    }
}

async function addToCart(req, res) {
    try {
        const productId = req.params.id;
        const userId = getUserId.getUserId(req, res);
        const isPresentInCart = await isPresent(userId, productId);
        if (isPresentInCart.length === 0) {
            const result = await cartModel.addToCart(userId, productId);
            if (result) {
                res.status(200).json({ message: result });
            } else {
                res.status(404).json({ message: 'Error' });
            }
        } else if (isPresentInCart.length > 0) {
            res.status(200).json({ message: 'Item already in your cart' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function incrementItem(req, res) {
    try {
        const productId = req.params.id;
        const userId = getUserId.getUserId(req, res);
        const isPresentInCart = await isPresent(userId, productId);
        const itemQuantity = isPresentInCart[0].quantity;
        const [maxLimitPerOrder] = await cartModel.getMaxLimitPerOrder(productId);
        console.log(maxLimitPerOrder);
        const [productStock] = await cartModel.checkProductStock(productId);
        console.log(productStock);
        if (isPresentInCart.length > 0 && itemQuantity < maxLimitPerOrder.max_limit_per_order && itemQuantity < productStock.stock) {
            const result = await cartModel.incrementItem(userId, productId);
            if (result) {
                res.status(200).json({ message: result });
            } else {
                res.status(404).json({ message: 'Error' });
            }
        } else {
            res.status(200).json({ message: 'Maximum limit reached' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function decrementItem(req, res) {
    try {
        const productId = req.params.id;
        const userId = getUserId.getUserId(req, res);
        const isPresentInCart = await isPresent(userId, productId);
        const itemQuantity = isPresentInCart[0].quantity;
        if (isPresentInCart.length > 0 && itemQuantity > 1) {
            const result = await cartModel.decrementItem(userId, productId);
            if (result) {
                res.status(200).json({ message: result });
            } else {
                res.status(404).json({ message: 'Error' });
            }
        } else {
            res.status(200).json({ message: 'Minimum limit reached' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addToCart, incrementItem, decrementItem };
