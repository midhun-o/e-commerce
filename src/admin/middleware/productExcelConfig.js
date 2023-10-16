/* eslint-disable linebreak-style */
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const extensionName = path.extname(file.originalname).toLowerCase();

    if (extensionName === '.xlsx') {
        cb(null, true);
    } else {
        cb(new Error('Please upload file with xlsx format'), false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/excel/');
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname.split(' ').join('_');
        cb(null, fileName);
    },
});

const productDetailsUpload = multer({ storage, fileFilter });

module.exports = { productDetailsUpload };
