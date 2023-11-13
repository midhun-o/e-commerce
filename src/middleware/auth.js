/* eslint-disable linebreak-style */

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.status(401).json({ success: false, error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userData = jwt.verify(token, secretKey, (err, data) => {
                if (err) {
                    res.status(401).json({ success: false, error: 'Wrong Token' });
                } else {
                    return data;
                }
            });
            if (userData) {
                const userId = userData.id.id;
                req.userId = userId;
                next();
            }
        }
    } catch (err) {
        return false;
    }
}

module.exports = { verifyToken };
