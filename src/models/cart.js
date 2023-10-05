/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const { makeDb } = require('../../config/dbConfig');

async function addToCart(userId, productId) {
    const connection = await makeDb();
    try {
        const addItemsQuery = 'INSERT INTO cart_items (cart_id, product_id) VALUES (?, ?)';
        await connection.query(addItemsQuery, [userId, productId]);
        return 'Added To cart';
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function isPresent(userId, productId) {
    const connection = await makeDb();
    try {
        const isPresentQuery = 'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?';
        const result = await connection.query(isPresentQuery, [userId, productId]);
        return result[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function checkProductStock(productId) {
    const connection = await makeDb();
    try {
        const checkProductStockQuery = 'SELECT stock FROM products WHERE id = ?';
        const result = await connection.query(checkProductStockQuery, [productId]);
        return result[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function getMaxLimitPerOrder(productId) {
    const connection = await makeDb();
    try {
        const checkProductStockQuery = 'SELECT max_limit_per_order FROM products WHERE id = ?';
        const result = await connection.query(checkProductStockQuery, [productId]);
        return result[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function incrementItem(userId, productId) {
    const connection = await makeDb();
    try {
        const incrementQuery = 'UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?;';
        await connection.query(incrementQuery, [userId, productId]);
        return 'Incremented item quantity';
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function decrementItem(userId, productId) {
    const connection = await makeDb();
    try {
        const decrementQuery = 'UPDATE cart_items SET quantity = quantity - 1 WHERE cart_id = ? AND product_id = ?;';
        await connection.query(decrementQuery, [userId, productId]);
        return 'Decremented item quantity';
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function viewCart(userId) {
    const connection = await makeDb();
    try {
        const viewCartQuery = 'SELECT p.name,ci.quantity,p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?;        ';
        const result = await connection.query(viewCartQuery, [userId]);
        return result[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function checkout(userId, paymentMethod, cartTotal) {
    const connection = await makeDb();
    try {
        const userAddressQuery = 'SELECT address FROM customer_address WHERE customer_id = ? AND is_default = 1';
        const result = await connection.query(userAddressQuery, [userId]);
        const [userAddress] = result;
        const { address } = userAddress[0];
        const insertOrderQuery = 'INSERT INTO orders (customer_id, total_price, shipping_address, payment_method) VALUES (?, ?, ?, ?)';
        await connection.query(insertOrderQuery, [userId, cartTotal, address, paymentMethod]);
        return true;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function resetCart(userId) {
    const connection = await makeDb();
    try {
        const resetCartQuery = 'DELETE FROM cart_items WHERE cart_id = ?';
        await connection.query(resetCartQuery, [userId]);
        return true;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = {
    addToCart, isPresent, incrementItem, decrementItem, checkProductStock, getMaxLimitPerOrder, viewCart, checkout, resetCart,
};
