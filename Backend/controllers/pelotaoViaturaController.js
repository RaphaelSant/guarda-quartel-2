const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/pelotao_viatura", (req, res) => {
    const sql = "SELECT * FROM pelotao_viatura order by dataRegistro, horaSaida";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para ler (Read) os dados a serem exibidos para o usuário em serviço anterior
router.get("/servico_anterior_pelotao_viatura", (req, res) => {
    const sql = "SELECT * FROM bk_pelotao_viatura order by dataRegistro, horaSaida";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para realizar novos registro de dados. (Create)
router.post("/pelotao_viatura", (req, res) => {
    const { vtrRegistro, odmSaidaRegistro, odmEntradaRegistro, dataRegistro, horaSaidaRegistro, horaEntradaRegistro, motoristaRegistro, chefeVtrRegistro, destinoRegistro } = req.body;
    const sql = "INSERT INTO pelotao_viatura (vtr, odmSaida, odmEntrada, dataRegistro, horaSaida, horaEntrada, motorista, chefeVtr, destino) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Validação dos dados
    if (!vtrRegistro || !dataRegistro || !motoristaRegistro || !destinoRegistro) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios.", status: 400 });
    }

    db.query(sql, [vtrRegistro, odmSaidaRegistro, odmEntradaRegistro, dataRegistro, horaSaidaRegistro, horaEntradaRegistro, motoristaRegistro, chefeVtrRegistro, destinoRegistro], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados inseridos com sucesso!" });
    });
});

// Rota para selecionar os dados por ID
router.get("/pelotao_viatura/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM pelotao_viatura WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para atualizar dados (UPDATE)
router.put("/pelotao_viatura/:id", (req, res) => {
    const id = req.params.id;
    const { vtr, odmSaida, odmEntrada, dataRegistro, horaSaida, horaEntrada, motorista, chefeVtr, destino } = req.body;

    // Validação dos dados
    if (!vtr || !dataRegistro || !motorista || !destino) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios.", status: 400 });
    }

    const sql = "UPDATE pelotao_viatura SET vtr=?, odmSaida=?, odmEntrada=?, dataRegistro=?, horaSaida=?, horaEntrada=?, motorista=?, chefeVtr=?, destino=? WHERE id=?";

    db.query(sql, [vtr, odmSaida, odmEntrada, dataRegistro, horaSaida, horaEntrada, motorista, chefeVtr, destino, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para deletar dados.
router.delete("/pelotao_viatura/:id", (req, res) => {
    const civisId = req.params.id;
    const sql = `DELETE FROM pelotao_viatura WHERE id = ?`;
    db.query(sql, civisId, (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.json({ message: "Registro deletado com sucesso" });
    });
});

module.exports = router;