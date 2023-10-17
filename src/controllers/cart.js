/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const cartModel = require('../models/cart');

async function isPresent(userId, productId) {
    try {
        const result = await cartModel.isPresent(userId, productId);
        return result;
    } catch (err) {
        return null;
    }
}

async function addToCart(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
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
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function incrementItem(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresentInCart = await isPresent(userId, productId);
        const itemQuantity = isPresentInCart[0].quantity;
        const [maxLimitPerOrder] = await cartModel.getMaxLimitPerOrder(productId);
        const [productStock] = await cartModel.checkProductStock(productId);
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
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function decrementItem(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
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
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function viewCart(req, res) {
    try {
        let cartTotal = 0;
        const { userId } = req;
        const result = await cartModel.viewCart(userId);
        result.forEach((item) => {
            cartTotal += item.price * item.quantity;
        });
        res.status(200).json({ cartItems: result, cartTotal: cartTotal });
        return cartTotal;
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function checkout(req, res) {
    try {
        let cartTotal = 0;
        const { userId } = req;
        const { paymentMethod } = req.body;
        const result = await cartModel.viewCart(userId);
        result.forEach((item) => {
            cartTotal += item.price * item.quantity;
        });
        if (cartTotal > 0) {
            const checkoutResult = await cartModel.checkout(userId, paymentMethod, cartTotal);
            if (checkoutResult) {
                await cartModel.resetCart(userId);
                res.status(200).json({ message: 'Order placed', orderAmount: cartTotal });
            }
        } else {
            res.status(200).json({ message: 'Empty cart' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addToCart, incrementItem, decrementItem, viewCart, checkout,
};
