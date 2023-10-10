/* eslint-disable linebreak-style */

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!authHeader) {
        res.status(401).json({ error: 'No token provided' });
    } else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                res.status(401).json({ error: 'Wrong Token' });
            } else {
                next();
            }
        });
    }
}

module.exports = { verifyToken };
