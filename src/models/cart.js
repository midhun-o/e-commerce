/* eslint-disable linebreak-style */

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

module.exports = {
    addToCart, isPresent, incrementItem, decrementItem, checkProductStock, getMaxLimitPerOrder,
};
