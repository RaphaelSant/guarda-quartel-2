const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/outra_om_viatura", (req, res) => {
    const sql = "SELECT * FROM oom_viatura order by dataRegistro, horaEntrada";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para realizar novos registro de dados. (Create)
router.post("/outra_om_viatura", (req, res) => {
    const { vtrRegistro, odmSaidaRegistro, odmEntradaRegistro, dataRegistro, horaSaidaRegistro, horaEntradaRegistro, motoristaRegistro, chefeVtrRegistro, destinoRegistro } = req.body;
    const sql = "INSERT INTO oom_viatura (vtr, odmSaida, odmEntrada, dataRegistro, horaSaida, horaEntrada, motorista, chefeVtr, destino) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Validação dos dados
    if (!vtrRegistro || !dataRegistro || !motoristaRegistro || !chefeVtrRegistro || !destinoRegistro) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    db.query(sql, [vtrRegistro, odmSaidaRegistro, odmEntradaRegistro, dataRegistro, horaSaidaRegistro, horaEntradaRegistro, motoristaRegistro, chefeVtrRegistro, destinoRegistro], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados inseridos com sucesso!" });
    });
});

// Rota para selecionar os dados por ID
router.get("/outra_om_viatura/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM oom_viatura WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para atualizar dados (UPDATE)
router.put("/outra_om_viatura/:id", (req, res) => {
    const id = req.params.id;
    const { vtr, odmSaida, odmEntrada, dataRegistro, horaSaida, horaEntrada, motorista, chefeVtr, destino } = req.body;

    // Validação dos dados
    if (!vtr || !dataRegistro || !motorista || !chefeVtr || !destino) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const sql = "UPDATE oom_viatura SET vtr=?, odmSaida=?, odmEntrada=?, dataRegistro=?, horaSaida=?, horaEntrada=?, motorista=?, chefeVtr=?, destino=? WHERE id=?";

    db.query(sql, [vtr, odmSaida, odmEntrada, dataRegistro, horaSaida, horaEntrada, motorista, chefeVtr, destino, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para deletar dados.
router.delete("/outra_om_viatura/:id", (req, res) => {
    const civisId = req.params.id;
    const sql = `DELETE FROM oom_viatura WHERE id = ?`;
    db.query(sql, civisId, (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.json({ message: "Registro deletado com sucesso" });
    });
});

module.exports = router;