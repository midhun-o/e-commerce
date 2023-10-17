/* eslint-disable linebreak-style */
const authModel = require('../models/auth');

function fetchRoles(requiredRole) {
    return async (req, res, next) => {
        try {
            const userRoleId = await authModel.findUserRole(req.userId);
            const roles = [];
            userRoleId.forEach((item) => {
                roles.push(item.role_id);
            });
            if (roles.includes(requiredRole) || roles.includes(1)) {
                next();
            } else {
                res.status(401).json({ error: 'You dont have access' });
            }
        } catch (err) {
            res.status(401).json({ error: 'Token verification failed' });
        }
    };
}

module.exports = { fetchRoles };
