/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const db = require('../../config/dbConfig');

async function addToCart(userId, productId) {
    try {
        const addItemsQuery = 'INSERT INTO cart_items (cart_id, product_id) VALUES (?, ?)';
        await db.query(addItemsQuery, [userId, productId]);
        return 'Added To cart';
    } catch (error) {
        return false;
    }
}

async function isPresent(userId, productId) {
    try {
        const isPresentQuery = 'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?';
        const result = await db.query(isPresentQuery, [userId, productId]);
        return result[0];
    } catch (error) {
        return false;
    }
}

async function checkProductStock(productId) {
    try {
        const checkProductStockQuery = 'SELECT stock FROM products WHERE id = ?';
        const result = await db.query(checkProductStockQuery, [productId]);
        return result[0];
    } catch (error) {
        return false;
    }
}

async function getMaxLimitPerOrder(productId) {
    try {
        const checkProductStockQuery = 'SELECT max_limit_per_order FROM products WHERE id = ?';
        const result = await db.query(checkProductStockQuery, [productId]);
        return result[0];
    } catch (error) {
        return false;
    }
}

async function incrementItem(userId, productId) {
    try {
        const incrementQuery = 'UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?;';
        await db.query(incrementQuery, [userId, productId]);
        return 'Incremented item quantity';
    } catch (error) {
        return false;
    }
}

async function decrementItem(userId, productId) {
    try {
        const decrementQuery = 'UPDATE cart_items SET quantity = quantity - 1 WHERE cart_id = ? AND product_id = ?;';
        await db.query(decrementQuery, [userId, productId]);
        return 'Decremented item quantity';
    } catch (error) {
        return false;
    }
}

async function viewCart(userId) {
    try {
        const viewCartQuery = 'SELECT p.name,ci.quantity,p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?;        ';
        const result = await db.query(viewCartQuery, [userId]);
        return result[0];
    } catch (error) {
        return false;
    }
}

async function checkout(userId, paymentMethod, cartTotal) {
    try {
        const userAddressQuery = 'SELECT address FROM customer_address WHERE customer_id = ? AND is_default = 1';
        const result = await db.query(userAddressQuery, [userId]);
        const [userAddress] = result;
        const { address } = userAddress[0];
        const insertOrderQuery = 'INSERT INTO orders (customer_id, total_price, shipping_address, payment_method) VALUES (?, ?, ?, ?)';
        await db.query(insertOrderQuery, [userId, cartTotal, address, paymentMethod]);
        return true;
    } catch (error) {
        return false;
    }
}

async function resetCart(userId) {
    try {
        const resetCartQuery = 'DELETE FROM cart_items WHERE cart_id = ?';
        await db.query(resetCartQuery, [userId]);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    addToCart, isPresent, incrementItem, decrementItem, checkProductStock, getMaxLimitPerOrder, viewCart, checkout, resetCart,
};
