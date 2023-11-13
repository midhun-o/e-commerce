/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

function generateToken(id) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const customer = { id };
        const token = jwt.sign(customer, secretKey, { expiresIn: '10d' });
        return token;
    } catch (err) {
        return false;
    }
}

module.exports = { generateToken };
