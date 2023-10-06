/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const jwt = require('jsonwebtoken');

function getUserId(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.json({ error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userId = jwt.verify(token, secretKey);
            console.log(userId);
            return userId.id.id;
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

module.exports = { getUserId };
