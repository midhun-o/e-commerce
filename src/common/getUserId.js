/* eslint-disable linebreak-style */

const jwt = require('jsonwebtoken');

function getUserId(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.status(401).json({ error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userId = jwt.verify(token, secretKey);
            return userId.id.id;
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

module.exports = { getUserId };
