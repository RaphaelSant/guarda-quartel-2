const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/civis_pe", (req, res) => {
    // const sql = "SELECT * FROM civis_pe order by dataEntrada, horaEntrada";
    const sql = "SELECT cp.cpf, cp.dataEntrada, cp.destino, cp.horaEntrada, cp.horaSaida, cp.id, cp.nome FROM civis_pe cp INNER JOIN config_servico cs ON cp.config_servico_id = cs.id WHERE cs.configurado = 1 order by cp.dataEntrada, cp.horaEntrada";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({message: "Houve algum erro no servidor", status: 500});
        }
        return res.status(200).json({data: data, status: 200});
    });
});

// Rota para selecionar os dados por ID
router.get("/civis_pe/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM civis_pe WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID

    db.query(sql, id, (err, data) => {
        if (err) {
            return res.status(500).json({message: "Houve algum erro no servidor", status: 500});
        }
        
        if (data.length === 0) {
            return res.status(404).json({ message: "Registro não encontrado", status: 404 });
        }
        return res.status(200).json({data: data[0], status: 200}); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para realizar novos registro de dados.
router.post("/civis_pe", (req, res) => {
    const { cpf, dataEntrada, destino, horaEntrada, horaSaida, nome, servConfigID } = req.body;
    const sql = "INSERT INTO civis_pe (cpf, dataEntrada, destino, horaEntrada, horaSaida, nome, config_servico_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Validação dos dados
    if (!cpf || !dataEntrada || !horaEntrada || !destino || !nome) {
        return res.status(400).json({ message: "Existem campos obrigatórios!", status: 400 });
    }

    db.query(sql, [cpf, dataEntrada, destino, horaEntrada, horaSaida, nome, servConfigID], (err, result) => {
        if (err) {
            return res.status(500).json({message: "Houve algum erro no servidor", status: 500});
        }

        return res.status(200).json({ message: "Dados inseridos com sucesso!", status: 200 });
    });
});

// Rota para atualizar dados
router.put("/civis_pe/:id", (req, res) => {
    const id = req.params.id;
    const { cpf, dataEntrada, destino, horaEntrada, horaSaida, nome } = req.body;
    const sql = "UPDATE civis_pe SET cpf=?, dataEntrada=?, destino=?, horaEntrada=?, horaSaida=?, nome=? WHERE id=?";

    if (!cpf || !dataEntrada || !horaEntrada || !destino || !nome || !horaSaida) {
        return res.status(400).json({ message: "Existem campos obrigatórios!", status: 400 });
    }

    db.query(sql, [cpf, dataEntrada, destino, horaEntrada, horaSaida, nome, id], (err, result) => {
        if (err) {
            return res.status(500).json({message: "Houve algum erro no servidor", status: 500});
        }

        return res.status(200).json({ message: "Dados atualizados com sucesso!", status: 200 });
    });
});

// Rota para deletar dados.
router.delete("/civis_pe/:id", (req, res) => {
    const civisId = req.params.id;
    const sql = `DELETE FROM civis_pe WHERE id = ?`;

    db.query(sql, civisId, (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado", status: 404 });
        }
        
        return res.status(200).json({ message: "Registro deletado com sucesso", status: 200 });
    });
});

module.exports = router;
