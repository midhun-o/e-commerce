/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

async function checkAdminPermission(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.json({ error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userDetails = jwt.verify(token, secretKey);
            const userId = userDetails.id;
            const userRoleId = await authModel.findUserRole(userId);
            console.log(userRoleId);
            if (userRoleId === 1 || userRoleId === 2) {
                next();
            } else {
                res.json({ error: 'You dont have access' });
            }
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

module.exports = { checkAdminPermission };
