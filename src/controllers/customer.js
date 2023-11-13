/* eslint-disable linebreak-style */

const customerModel = require('../models/customer');

async function isPresentInCart(userId, productId) {
    try {
        const result = await customerModel.isPresentInCart(userId, productId);
        return result;
    } catch (err) {
        return null;
    }
}

async function isPresentInWishlist(userId, productId) {
    try {
        const result = await customerModel.isPresentInWishlist(userId, productId);
        return result;
    } catch (err) {
        return null;
    }
}

async function addToCart(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresent = await isPresentInCart(userId, productId);
        if (isPresent.length === 0) {
            const result = await customerModel.addToCart(userId, productId);
            if (result) {
                res.status(200).json({ success: true, productDetails: result });
            } else {
                res.status(404).json({ success: false, message: 'Error' });
            }
        } else if (isPresent.length > 0) {
            res.status(200).json({ success: false, message: 'Item already in your cart' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function incrementItem(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresent = await isPresentInCart(userId, productId);
        const itemQuantity = isPresent[0].quantity;
        const [maxLimitPerOrder] = await customerModel.getMaxLimitPerOrder(productId);
        const [productStock] = await customerModel.checkProductStock(productId);
        if (isPresent.length > 0
            && itemQuantity < maxLimitPerOrder.max_limit_per_order
            && itemQuantity < productStock.stock) {
            const result = await customerModel.incrementItem(userId, productId);
            if (result) {
                res.status(200).json({ success: true, data: result });
            } else {
                res.status(404).json({ success: false, message: 'Error' });
            }
        } else {
            res.status(200).json({ success: false, message: 'Maximum limit reached' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function decrementItem(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresent = await isPresentInCart(userId, productId);
        const itemQuantity = isPresent[0].quantity;
        if (isPresent.length > 0 && itemQuantity > 1) {
            const result = await customerModel.decrementItem(userId, productId);
            if (result) {
                res.status(200).json({ success: true, data: result });
            } else {
                res.status(404).json({ success: false, message: 'Error' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Minimum limit reached' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function viewCart(req, res) {
    try {
        let cartTotal = 0;
        const { userId } = req;
        const result = await customerModel.viewCart(userId);
        result.forEach((item) => {
            cartTotal += item.price * item.quantity;
        });
        res.status(200).json({ success: true, cartItems: result, cartTotal: cartTotal });
        return cartTotal;
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function removeCartItem(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresent = await isPresentInCart(userId, productId);
        if (isPresent.length > 0) {
            const result = await customerModel.removeCartItem(userId, productId);
            if (result) {
                res.status(200).json({ success: true, data: result, message: 'Removed Item' });
            } else {
                res.status(404).json({ success: false, message: 'Error' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Item not present in Cart' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function checkout(req, res) {
    try {
        let cartTotal = 0;
        const { userId } = req;
        const { paymentMethod } = req.body;
        const result = await customerModel.viewCart(userId);
        result.forEach((item) => {
            cartTotal += item.price * item.quantity;
        });
        if (cartTotal > 0) {
            const checkoutResult = await customerModel.checkout(userId, paymentMethod, cartTotal);
            if (checkoutResult) {
                await customerModel.resetCart(userId);
                res.status(200).json({ success: true, message: 'Order placed', orderAmount: cartTotal });
            }
        } else {
            res.status(200).json({ success: false, message: 'Empty cart' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addToWishlist(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresent = await isPresentInWishlist(userId, productId);
        if (isPresent.length === 0) {
            const result = await customerModel.addToWishlist(userId, productId);
            if (result) {
                res.status(200).json({ success: true, productDetails: result });
            } else {
                res.status(404).json({ success: false, message: 'Error' });
            }
        } else if (isPresent.length > 0) {
            res.status(200).json({ success: false, message: 'Item already in your Wishlist' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function viewWishlist(req, res) {
    try {
        const { userId } = req;
        const result = await customerModel.viewWishlist(userId);
        res.status(200).json({ success: true, wishlistItems: result });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function removeWishlistItem(req, res) {
    try {
        const productId = req.params.id;
        const { userId } = req;
        const isPresent = await isPresentInWishlist(userId, productId);
        if (isPresent.length > 0) {
            const result = await customerModel.removeWishlistItem(userId, productId);
            if (result) {
                res.status(200).json({ success: true, data: result, message: 'Removed Item' });
            } else {
                res.status(404).json({ success: false, message: 'Error' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Item not present in wishlist' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function fetchBannerImage(req, res) {
    try {
        const result = await customerModel.fetchBannerImage();
        if (result) {
            res.status(200).json({ success: true, message: result[0] });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = {
    addToCart,
    incrementItem,
    decrementItem,
    viewCart,
    removeCartItem,
    checkout,
    addToWishlist,
    viewWishlist,
    removeWishlistItem,
    fetchBannerImage,
};
