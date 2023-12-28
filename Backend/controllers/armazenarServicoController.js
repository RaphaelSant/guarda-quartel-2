const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para copiar os dados
router.post('/armazenar_servico', (req, res) => {
    const query = 'INSERT INTO bk_civis_pe SELECT * FROM civis_pe;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao copiar dados:', err);
            return res.status(500).send('Erro ao copiar dados');
        }

        console.log('Dados copiados com sucesso');
        res.status(200).send('Dados copiados com sucesso');
    });
});

module.exports = router;
