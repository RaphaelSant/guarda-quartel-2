const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/configuracao_servico", (req, res) => {
    const sql = "SELECT * FROM config_servico";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para ler (Read) os dados a serem exibidos para o usuário em serviço anterior
router.get("/servico_anterior_configuracao_servico", (req, res) => {
    const sql = "SELECT * FROM bk_configuracao_servico";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para realizar novos registro de dados. (Create)
router.post("/configuracao_servico", (req, res) => {
    const { configurado, dataServico, sgtNomeGuerra, cbNomeGuerra, motoristaNomeGuerra, sdPrimeiroHorario, sdSegundoHorario, sdTerceiroHorario } = req.body;

    // Validação dos dados
    if (!configurado || !dataServico || !sgtNomeGuerra || !cbNomeGuerra || !motoristaNomeGuerra || !sdPrimeiroHorario || !sdSegundoHorario || !sdTerceiroHorario) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios.", status: 400 });
    }

    const sql = "INSERT INTO config_servico (configurado, servico_ref, sgtNomeGuerra, cbNomeGuerra, motoristaNomeGuerra, sdPrimeiroHorNome, sdSegundoHorNome, sdTerceiroHorNome) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [configurado, dataServico, sgtNomeGuerra, cbNomeGuerra, motoristaNomeGuerra, sdPrimeiroHorario, sdSegundoHorario, sdTerceiroHorario], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: "Erro ao inserir os dados.", status: 500 });
        }

        return res.status(201).json({ message: "Dados inseridos com sucesso!" });
    });
});

// Rota para selecionar os dados por ID
router.get("/configuracao_servico/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM config_servico WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para atualizar dados (UPDATE)
router.put("/configuracao_servico/:id", (req, res) => {
    const id = req.params.id;
    const { dataServico, sgtNomeGuerra, cbNomeGuerra, motoristaNomeGuerra, sdPrimeiroHorario, sdSegundoHorario, sdTerceiroHorario } = req.body;

    // Validação dos dados
    if (!dataServico) {
        return res.status(400).json({ message: "O campo Data é obrigatório", status: 400 });
    }

    const sql = "UPDATE config_servico SET servico_ref=?, sgtNomeGuerra=?, cbNomeGuerra=?, motoristaNomeGuerra=?, sdPrimeiroHorNome=?, sdSegundoHorNome=?, sdTerceiroHorNome=? WHERE id=?";

    db.query(sql, [dataServico, sgtNomeGuerra, cbNomeGuerra, motoristaNomeGuerra, sdPrimeiroHorario, sdSegundoHorario, sdTerceiroHorario, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});


// Rota para deletar dados.
router.delete("/configuracao_servico/:id", (req, res) => {
    const civisId = req.params.id;
    const sql = `DELETE FROM config_servico WHERE id = ?`;
    db.query(sql, civisId, (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.json({ message: "Registro deletado com sucesso" });
    });
});

module.exports = router;