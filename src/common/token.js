const jwt = require('jsonwebtoken');

function generateToken(email) {
    const secretKey = process.env.JWT_SECRET_KEY;
    const customer = { email };
    const token = jwt.sign(customer, secretKey, { expiresIn: '1h' });
    return token;
}

module.exports = { generateToken };
