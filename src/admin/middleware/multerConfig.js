/* eslint-disable linebreak-style */
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

const upload = multer({ storage, limits: { fileSize: 2097152 } });

module.exports = { upload };
