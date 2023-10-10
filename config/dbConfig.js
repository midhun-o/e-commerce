/* eslint-disable linebreak-style */
const mysql = require('mysql2/promise');

async function makeDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1110',
            database: 'midhun',
        });
        return connection;
    } catch (error) {
        return false;
    }
}

module.exports = { makeDb };
