/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const mysql = require('mysql2/promise');

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1110',
    database: 'midhun',
});

module.exports = con;
