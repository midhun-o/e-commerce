/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const adminModel = require('../models/products');

async function viewRoles(req, res) {
    try {
        const { id } = req.params;
        const result = await adminModel.viewRoles(id);
        if (result) {
            res.status(200).json({ roles: result });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addRoles(req, res) {
    try {
        const { id } = req.params;
        const { roleId } = req.body;
        if (roleId > 0 && roleId < 5) {
            const result = await adminModel.addRoles(id, roleId);
            if (result) {
                res.status(200).json({ message: 'Role added' });
            } else {
                res.status(404).json({ message: 'Something went wrong' });
            }
        } else {
            res.status(404).json({ message: 'RoleId should be between 1 - 4' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function removeRoles(req, res) {
    try {
        const { id } = req.params;
        const { roleId } = req.body;
        if (roleId > 0 && roleId < 5) {
            const result = await adminModel.removeRoles(id, roleId);
            if (result) {
                res.status(200).json({ message: 'Role removed' });
            } else {
                res.status(404).json({ message: 'Something went wrong' });
            }
        } else {
            res.status(404).json({ message: 'RoleId should be between 1 - 4' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addProduct(req, res) {
    try {
        const {
            name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId,
        } = req.body;
        const imageName = req.file.filename;
        const imageLink = `/img/${imageName}`;
        const result = await adminModel.addProduct(name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink);
        if (result) {
            res.status(200).json({ message: 'Item added successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addBannerImage(req, res) {
    try {
        const imageName = req.file.filename;
        const imageTitle = req.body.title;
        const imageLink = `/img/banner/${imageName}`;
        const result = await adminModel.addBannerImage(imageTitle, imageLink);
        if (result) {
            res.status(200).json({ message: 'Image added successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteBannerImage(req, res) {
    try {
        const imageId = req.params.id;
        const result = await adminModel.deleteBannerImage(imageId);
        if (result) {
            res.status(200).json({ message: 'Image Deleted successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function fetchBannerImage(req, res) {
    try {
        const result = await adminModel.fetchBannerImage();
        if (result) {
            res.status(200).json({ message: result[0] });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const updatedDetails = req.body;
        const result = await adminModel.updateProduct(updatedDetails, productId);
        if (result) {
            res.status(200).json({ message: 'Item updated successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
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
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function fetchProducts(req, res) {
    try {
        const pageNumber = req.query.page;
        const result = await adminModel.fetchProducts(pageNumber);
        res.status(200).json({ products: result });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addProduct, updateProduct, deleteProduct, viewRoles, addRoles, removeRoles, addBannerImage, deleteBannerImage, fetchBannerImage, fetchProducts,
};
