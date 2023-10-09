/* eslint-disable linebreak-style */
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const extensionName = path.extname(file.originalname).toLowerCase();

    if (extensionName === '.png') {
        cb(null, true);
    } else {
        cb(new Error('Please upload file with png format'), false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img/banner');
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname.replace(' ', '-');
        cb(null, fileName);
    },
});

const bannerImageUpload = multer({ storage, limits: { fileSize: 1048576 }, fileFilter });

module.exports = { bannerImageUpload };
