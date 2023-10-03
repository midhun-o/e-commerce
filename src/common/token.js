/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

function generateToken(id) {
    const secretKey = process.env.JWT_SECRET_KEY;
    const customer = { id };
    const token = jwt.sign(customer, secretKey, { expiresIn: '10d' });
    return token;
}

module.exports = { generateToken };
