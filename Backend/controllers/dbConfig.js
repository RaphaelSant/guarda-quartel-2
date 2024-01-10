const mysql = require("mysql");

/*
const db = mysql.createConnection({
    database: "sisregex",
    host: "localhost",
    user: "root",
    password: "root123",
});
*/

const dbConfig = ({
    database: "sisregex",
    host: "localhost",
    user: "root",
    password: "root123"
});

const connection = mysql.createPool(dbConfig);

module.exports = connection;