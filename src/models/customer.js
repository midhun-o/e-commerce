/* eslint-disable linebreak-style */

const { makeDb } = require('../../config/dbConfig');

async function addToCart(userId, productId) {
    const connection = await makeDb();
    try {
        const addItemsQuery = 'INSERT INTO cart_items (cart_id, product_id) VALUES (?, ?)';
        await connection.query(addItemsQuery, [userId, productId]);
        const getProductsDetailsQuery = 'SELECT p.id,p.name,p.price,pi.url FROM products p join product_images pi on p.id = pi.product_id where p.id = ?';
        const productDetails = await connection.query(getProductsDetailsQuery, [productId]);
        return productDetails[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function isPresentInCart(userId, productId) {
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

async function isPresentInWishlist(userId, productId) {
    const connection = await makeDb();
    try {
        const isPresentQuery = 'SELECT id FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?';
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
        const incrementQuery = 'UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?';
        await connection.query(incrementQuery, [userId, productId]);
        const getQuantityQuery = 'SELECT product_id as id,quantity FROM  cart_items  WHERE cart_id = ? AND product_id = ?';
        const quantity = await connection.query(getQuantityQuery, [userId, productId]);
        return quantity[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function decrementItem(userId, productId) {
    const connection = await makeDb();
    try {
        const decrementQuery = 'UPDATE cart_items SET quantity = quantity - 1 WHERE cart_id = ? AND product_id = ?';
        await connection.query(decrementQuery, [userId, productId]);
        const getQuantityQuery = 'SELECT product_id as id,quantity FROM  cart_items  WHERE cart_id = ? AND product_id = ?';
        const quantity = await connection.query(getQuantityQuery, [userId, productId]);
        return quantity[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function viewCart(userId) {
    const connection = await makeDb();
    try {
        const viewCartQuery = 'SELECT p.id,pi.url,p.name,ci.quantity,p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id join product_images pi on p.id = pi.product_id WHERE ci.cart_id = ?';
        const result = await connection.query(viewCartQuery, [userId]);
        return result[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function removeCartItem(userId, productId) {
    const connection = await makeDb();
    try {
        const removeQuery = 'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?';
        await connection.query(removeQuery, [userId, productId]);
        return productId;
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

async function addToWishlist(userId, productId) {
    const connection = await makeDb();
    try {
        const addItemsQuery = 'INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)';
        await connection.query(addItemsQuery, [userId, productId]);
        const getProductsDetailsQuery = 'SELECT p.id,p.name,p.price,pi.url FROM products p join product_images pi on p.id = pi.product_id where p.id = ?';
        const productDetails = await connection.query(getProductsDetailsQuery, [productId]);
        return productDetails[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function viewWishlist(userId) {
    const connection = await makeDb();
    try {
        const viewWishlistQuery = 'SELECT p.id,pi.url,p.name,p.price FROM wishlist_items wi JOIN products p ON wi.product_id = p.id join product_images pi on p.id = pi.product_id WHERE wi.wishlist_id = ?';
        const result = await connection.query(viewWishlistQuery, [userId]);
        return result[0];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function removeWishlistItem(userId, productId) {
    const connection = await makeDb();
    try {
        const decrementQuery = 'DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?';
        await connection.query(decrementQuery, [userId, productId]);
        return productId;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function fetchBannerImage() {
    const connection = await makeDb();
    try {
        const fetchBannerImageQuery = 'select id,title,image_url FROM banner_image';
        const result = await connection.query(fetchBannerImageQuery);
        return result;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = {
    addToCart,
    isPresentInCart,
    incrementItem,
    decrementItem,
    checkProductStock,
    getMaxLimitPerOrder,
    viewCart,
    removeCartItem,
    checkout,
    resetCart,
    addToWishlist,
    viewWishlist,
    isPresentInWishlist,
    removeWishlistItem,
    fetchBannerImage,
};
