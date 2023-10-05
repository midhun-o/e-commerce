/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const mysql = require('mysql2/promise');

async function makeDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1110',
            database: 'midhun',
        });
        console.log('Connected to the database');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = { makeDb };
