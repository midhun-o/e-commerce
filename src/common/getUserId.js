/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const jwt = require('jsonwebtoken');

function getUserId(req, res) {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!authHeader) {
        res.json({ error: 'No token provided' });
    } else {
        const token = authHeader.split(' ')[1];
        const userId = jwt.verify(token, secretKey);
        return userId.id;
    }
}

module.exports = { getUserId };
