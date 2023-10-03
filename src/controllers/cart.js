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

async function viewCart(req, res) {
    try {
        let cartTotal = 0;
        const userId = getUserId.getUserId(req, res);
        const result = await cartModel.viewCart(userId);
        result.forEach((item) => {
            cartTotal += item.price * item.quantity;
        });
        res.status(200).json({ cartItems: result, cartTotal: cartTotal });
        return cartTotal;
    } catch (err) {
        console.error('DB retrieve error', err);
    }
}

async function checkout(req, res) {
    try {
        let cartTotal = 0;
        const userId = getUserId.getUserId(req, res);
        const { paymentMethod } = req.body;
        const result = await cartModel.viewCart(userId);
        result.forEach((item) => {
            cartTotal += item.price * item.quantity;
        });
        if (cartTotal > 0) {
            const checkoutResult = await cartModel.checkout(userId, paymentMethod, cartTotal);
            console.log(checkoutResult);
            if (checkoutResult) {
                await cartModel.resetCart(userId);
                res.status(200).json({ message: 'Order placed', orderAmount: cartTotal });
            }
        } else {
            res.status(200).json({ message: 'Empty cart' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
    }
}

module.exports = {
    addToCart, incrementItem, decrementItem, viewCart, checkout,
};
