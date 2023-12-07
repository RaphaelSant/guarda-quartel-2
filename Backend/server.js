const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'sisregex'
});

db.connect();

//Delete
app.delete('/:tabela/:id', (req, res) => {
    const tabela = req.params.tabela;
    const id = req.params.id;
    const sql = `DELETE FROM ${tabela} WHERE id = ?`;

    connection.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao deletar a linha');
        } else {
            res.status(200).send('Linha deletada com sucesso');
        }
    });
});

// Geters

app.get('/', (re, res) => {
    return res.json("From backend side!");
});

app.get('/civis_pe', (req, res) => {
    const sql = 'SELECT * FROM civis_pe';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.listen(8081, () => {
    console.log('listening');
})