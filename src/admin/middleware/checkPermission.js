/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

function fetchRoles(requiredRole) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const secretKey = process.env.JWT_SECRET_KEY;
            if (!authHeader) {
                res.status(401).json({ error: 'No token provided' });
            } else {
                const token = authHeader.split(' ')[1];
                const userDetails = jwt.verify(token, secretKey);
                const userId = userDetails.id.id;
                const userRoleId = await authModel.findUserRole(userId);
                const roles = [];
                userRoleId.forEach((item) => {
                    roles.push(item.role_id);
                });
                if (roles.includes(requiredRole) || roles.includes(1)) {
                    next();
                } else {
                    res.status(401).json({ error: 'You dont have access' });
                }
            }
        } catch (err) {
            res.status(401).json({ error: 'Token verification failed' });
        }
    };
}

module.exports = { fetchRoles };
