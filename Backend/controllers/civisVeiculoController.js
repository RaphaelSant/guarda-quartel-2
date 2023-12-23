const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/civis_veiculo", (req, res) => {
    const sql = "SELECT * FROM civis_veiculo order by dataEntrada, horaEntrada";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para selecionar os dados por ID
router.get("/civis_veiculo/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM civis_veiculo WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para realizar novos registro de dados.
router.post("/civis_veiculo", (req, res) => {
    const { nome, cnh, placa, dataEntrada, horaEntrada, horaSaida, destino } = req.body;
    const sql = "INSERT INTO civis_veiculo (nome, cnh, placa, dataEntrada, horaEntrada, horaSaida, destino) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Validação dos dados
    if (!nome || !cnh || !placa || !dataEntrada || !horaEntrada || !destino) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    db.query(sql, [nome, cnh, placa, dataEntrada, horaEntrada, horaSaida, destino], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados inseridos com sucesso!" });
    });
});

// Rota para atualizar dados
router.put("/civis_veiculo/:id", (req, res) => {
    const id = req.params.id;
    const { nome, cnh, placa, dataEntrada, horaEntrada, horaSaida, destino } = req.body;
    const sql = "UPDATE civis_veiculo SET nome=?, cnh=?, placa=?, dataEntrada=?, horaEntrada=?, horaSaida=?, destino=? WHERE id=?";

    db.query(sql, [nome, cnh, placa, dataEntrada, horaEntrada, horaSaida, destino, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});


// Rota para deletar dados.
router.delete("/civis_veiculo/:id", (req, res) => {
    const civisId = req.params.id;
    const sql = `DELETE FROM civis_veiculo WHERE id = ?`;
    db.query(sql, civisId, (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.json({ message: "Registro deletado com sucesso" });
    });
});

module.exports = router;