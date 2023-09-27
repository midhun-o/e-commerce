/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1110',
    database: 'midhun',
};

const createConnection = () => {
    const con = mysql.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (err) {
                console.error('DB connection failed', err);
                reject(err);
            } else {
                console.log('DB Connected');
                resolve(con);
            }
        });
    });
};

module.exports = {
    createConnection, dbConfig,
};
