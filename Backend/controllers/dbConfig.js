const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "sisregex",
});

db.connect();

module.exports = db;