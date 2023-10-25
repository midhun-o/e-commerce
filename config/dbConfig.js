/* eslint-disable linebreak-style */
const mysql = require('mysql2/promise');

async function makeDb() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_URL,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        return connection;
    } catch (error) {
        return false;
    }
}

module.exports = { makeDb };
