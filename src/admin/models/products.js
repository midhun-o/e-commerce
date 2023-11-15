/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const { makeDb } = require('../../../config/dbConfig');

async function viewRoles(id) {
    const connection = await makeDb();
    try {
        const viewRolesQuery = 'select u.id as userId,u.username as userName, r.role_id as roleId,ur.name roleName from user u join roles r on u.id = r.user_id join user_roles ur on r.role_id = ur.id where u.id = ?';
        const result = await connection.query(viewRolesQuery, [id]);
        return result[0];
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function addRoles(id, roleId) {
    const connection = await makeDb();
    try {
        const addRolesQuery = 'INSERT INTO roles (user_id,role_id) VALUES (?, ?)';
        await connection.query(addRolesQuery, [id, roleId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function removeRoles(id, roleId) {
    const connection = await makeDb();
    try {
        const removeRolesQuery = 'DELETE FROM roles WHERE user_id = ? and role_id = ?';
        await connection.query(removeRolesQuery, [id, roleId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function addProduct(productsDetails) {
    const connection = await makeDb();
    try {
        const [name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink] = productsDetails;
        const addProductsQuery = 'INSERT INTO products (name, sku, description, price, stock, max_limit_per_order, category_id, discount, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.query(addProductsQuery, [name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId]);
        const query = 'SELECT id FROM products WHERE sku = ?';
        const [response] = await connection.query(query, [sku]);
        const productId = response[0].id;
        const addImageQuery = 'INSERT INTO product_images (product_id, url) VALUES (?, ?)';
        await connection.query(addImageQuery, [productId, imageLink]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function addBannerImage(title, imageLink) {
    const connection = await makeDb();
    try {
        const addBannerImageQuery = 'INSERT INTO banner_image (title, image_url) VALUES (?, ?)';
        await connection.query(addBannerImageQuery, [title, imageLink]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function deleteBannerImage(id) {
    const connection = await makeDb();
    try {
        const deleteBannerImageQuery = 'DELETE FROM banner_image WHERE id = ?';
        await connection.query(deleteBannerImageQuery, [id]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function fetchBannerImage() {
    const connection = await makeDb();
    try {
        const fetchBannerImageQuery = 'select * FROM banner_image';
        const result = await connection.query(fetchBannerImageQuery);
        return result;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function updateProduct(updatedDetails, productId) {
    const connection = await makeDb();
    try {
        const selectProductQuery = 'SELECT * FROM products WHERE id = ?';
        const [existingProduct] = await connection.query(selectProductQuery, [productId]);
        if (existingProduct.length === 0) {
            return false;
        }
        const updateProductsQuery = 'UPDATE products SET ? WHERE id = ?';
        await connection.query(updateProductsQuery, [updatedDetails, productId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function deleteProduct(productId) {
    const connection = await makeDb();
    try {
        const selectProductQuery = 'SELECT * FROM products WHERE id = ?';
        const [existingProduct] = await connection.query(selectProductQuery, [productId]);
        if (existingProduct.length === 0) {
            return false;
        }
        const deleteImageQuery = 'DELETE FROM product_images WHERE product_id = ?';
        await connection.query(deleteImageQuery, [productId]);
        const deleteProductQuery = 'DELETE FROM products WHERE id = ?';
        await connection.query(deleteProductQuery, [productId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function fetchProducts() {
    const connection = await makeDb();
    try {
        const query = 'SELECT p.id AS id,pi.url AS image,p.name AS name,p.sku AS sku,c.name AS category,p.price AS price,p.stock AS stock,p.status AS status,p.max_limit_per_order AS maxLimit,p.discount AS discount,s.name AS seller,CONCAT_WS(" ",DAY(p.created),MONTHNAME(p.created),YEAR(p.created)) AS addedDate FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c on c.id = p.category_id JOIN seller s ON p.seller_id = s.id order by p.created desc';
        const [results] = await connection.query(query);
        return results;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function fetchProductById(productId) {
    const connection = await makeDb();
    try {
        const query = 'SELECT * FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c on c.id = p.category_id JOIN seller s ON p.seller_id = s.id WHERE p.id = ?';
        const [results] = await connection.query(query, [productId]);
        return results;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function getSellerAndCategory() {
    const connection = await makeDb();
    try {
        const sellerQuery = 'SELECT id,name FROM seller;';
        const [seller] = await connection.query(sellerQuery);
        const categoryQuery = 'SELECT id,name FROM category;';
        const [category] = await connection.query(categoryQuery);
        return [seller, category];
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function addUser(username, password, email) {
    const connection = await makeDb();
    try {
        const check = 'SELECT email,username FROM user WHERE email = ? or username = ?';
        const [result] = await connection.query(check, [email, username]);
        if (result.length > 0) {
            return result;
        }
        const query = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
        await connection.query(query, [username, password, email]);
        return result;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = {
    fetchProductById, getSellerAndCategory, addProduct, updateProduct, deleteProduct, viewRoles, addRoles, removeRoles, addBannerImage, deleteBannerImage, fetchBannerImage, fetchProducts, addUser,
};
