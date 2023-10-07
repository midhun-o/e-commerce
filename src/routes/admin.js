/* eslint-disable linebreak-style */
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img/');
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname.replace(' ', '-');
        cb(null, fileName);
    },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 2 } });

const router = express.Router();
const adminController = require('../admin/controllers/products');
const authController = require('../admin/controllers/auth');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../admin/middleware/checkPermission');

router.post('/login', authController.adminLogin);
router.post('/addproduct', authMiddleware.verifyToken, adminMiddleware.checkAddAccess, upload.single('productImage'), adminController.addProduct);
router.put('/updateproducts/:id', authMiddleware.verifyToken, adminMiddleware.checkEditAccess, adminController.updateProduct);
router.delete('/deleteproduct/:id', authMiddleware.verifyToken, adminMiddleware.checkDeleteAccess, adminController.deleteProduct);
router.get('/viewroles/:id', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.viewRoles);
router.post('/addrole/:id', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.addRoles);
router.post('/removerole/:id', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.removeRoles);

module.exports = router;
