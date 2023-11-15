/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const xlsx = require('xlsx');
const adminModel = require('../models/products');

async function viewRoles(req, res) {
    try {
        const { id } = req.params;
        const result = await adminModel.viewRoles(id);
        if (result) {
            res.status(200).json({ success: true, roles: result });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addRoles(req, res) {
    try {
        const { id } = req.params;
        const { roleId } = req.body;
        if (roleId > 0 && roleId < 5) {
            const result = await adminModel.addRoles(id, roleId);
            if (result) {
                res.status(200).json({ success: true, message: 'Role added' });
            } else {
                res.status(404).json({ success: false, message: 'Something went wrong' });
            }
        } else {
            res.status(404).json({ success: false, message: 'RoleId should be between 1 - 4' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function removeRoles(req, res) {
    try {
        const { id } = req.params;
        const { roleId } = req.body;
        if (roleId > 0 && roleId < 5) {
            const result = await adminModel.removeRoles(id, roleId);
            if (result) {
                res.status(200).json({ success: true, message: 'Role removed' });
            } else {
                res.status(404).json({ success: false, message: 'Something went wrong' });
            }
        } else {
            res.status(404).json({ success: false, message: 'RoleId should be between 1 - 4' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addProduct(req, res) {
    try {
        const {
            name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId,
        } = req.body;
        const imageName = req.file.filename;
        const imageLink = `/img/${imageName}`;
        const productsDetails = [name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink];
        const result = await adminModel.addProduct(productsDetails);
        if (result) {
            res.status(200).json({ success: true, message: 'Item added successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addBannerImage(req, res) {
    try {
        const imageName = req.file.filename;
        const imageTitle = req.body.title;
        const imageLink = `/img/banner/${imageName}`;
        const result = await adminModel.addBannerImage(imageTitle, imageLink);
        if (result) {
            res.status(200).json({ success: true, message: 'Image added successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function deleteBannerImage(req, res) {
    try {
        const imageId = req.params.id;
        const result = await adminModel.deleteBannerImage(imageId);
        if (result) {
            res.status(200).json({ success: true, message: 'Image Deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function fetchBannerImage(req, res) {
    try {
        const result = await adminModel.fetchBannerImage();
        if (result) {
            res.status(200).json({ success: true, message: result[0] });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const updatedDetails = req.body;
        const result = await adminModel.updateProduct(updatedDetails, productId);
        if (result) {
            res.status(200).json({ success: true, message: 'Item updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const result = await adminModel.deleteProduct(productId);
        if (result) {
            res.status(200).json({ success: true, message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function getSellerAndCategory(req, res) {
    try {
        const result = await adminModel.getSellerAndCategory();
        res.status(200).json({ success: true, products: result });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function fetchProducts(req, res) {
    try {
        const result = await adminModel.fetchProducts();
        res.status(200).json({ success: true, products: result });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function fetchProductById(req, res) {
    try {
        const productId = req.params.id;
        const result = await adminModel.fetchProductById(productId);
        res.status(200).json({ success: true, products: result });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addProductFromExcel(req, res) {
    try {
        const fileLink = req.file.path;
        const workbook = xlsx.readFile(fileLink);
        const sheetNameList = workbook.SheetNames;
        const jsonData = xlsx.utils.sheet_to_json(
            workbook.Sheets[sheetNameList],
        );
        const jsonDataStore = async (item) => {
            const {
                name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageName,
            } = item;
            const imageLink = `img/${imageName}`;
            const productDetails = [name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink];
            await adminModel.addProduct(productDetails);
        };
        jsonData.forEach((item) => {
            jsonDataStore(item);
        });
        res.status(200).json({ success: true, message: 'Items added successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addUser(req, res) {
    const {
        username, password, email,
    } = req.body;
    if (!username.trim() || !password.trim() || !email.trim()) {
        res.status(400).json({ error: 'Please fill all fields' });
    } else {
        try {
            const result = await adminModel.addUser(username, password, email);
            if (result.length > 0) {
                if (result[0].email === email) {
                    res.status(401).json({ success: false, message: 'Email already picked' });
                } else {
                    res.status(401).json({ success: false, message: 'Username already picked' });
                }
            } else {
                res.status(201).json({ success: true, message: 'User registered successfully' });
            }
        } catch (err) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

module.exports = {
    fetchProductById, getSellerAndCategory, addProduct, updateProduct, deleteProduct, viewRoles, addRoles, removeRoles, addBannerImage, deleteBannerImage, fetchBannerImage, fetchProducts, addProductFromExcel, addUser,
};
