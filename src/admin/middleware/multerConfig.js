/* eslint-disable linebreak-style */
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const fileTypes = ['.jpg', '.jpeg'];
    const extensionName = path.extname(file.originalname).toLowerCase();

    if (fileTypes.includes(extensionName)) {
        cb(null, true);
    } else {
        cb(new Error('Please upload file with jpg or jpeg format'), false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img/');
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname.replace(' ', '-');
        cb(null, fileName);
    },
});

const upload = multer({ storage, limits: { fileSize: 2097152 }, fileFilter });

module.exports = { upload };
