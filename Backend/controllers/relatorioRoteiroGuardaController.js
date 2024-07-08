const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/relatorio_roteiro_guarda", (req, res) => {
    const sql = "SELECT rrg.id, rrg.configurado, rrg.config_servico_id, cs.sgtNomeGuerra, rrg.sgtTpArmamento, rrg.sgtNrArmamento, rrg.sgtQtdMun, cs.cbNomeGuerra, rrg.cbTpArmamento, rrg.cbNrArmamento, rrg.cbQtdMun, cs.motoristaNomeGuerra, rrg.sdTpArmamento, rrg.sdNrArmamento, rrg.sdQtdMun, cs.sdPrimeiroHorNome, cs.sdSegundoHorNome, cs.sdTerceiroHorNome FROM relatorio_roteiro_guarda rrg INNER JOIN config_servico cs ON rrg.config_servico_id = cs.id WHERE cs.configurado = 1 order by rrg.id";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para ler (Read) os dados a serem exibidos para o usuário em servico anterior
router.get("/servico_anterior_relatorio_roteiro_guarda", (req, res) => {
    const sql = "SELECT * FROM bk_relatorio_roteiro_guarda";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para realizar novos registro de dados. (Create)
router.post("/relatorio_roteiro_guarda", (req, res) => {
    const { configurado, configServicoId, sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, motTpArmamento, motNrArmamento, motQtdMun } = req.body;

    // Validação dos dados
    if (!configurado || !configServicoId || !sgtTpArmamento || !sgtNrArmamento || !sgtQtdMun || !cbTpArmamento || !cbNrArmamento || !cbQtdMun || !motTpArmamento || !motNrArmamento || !motQtdMun ) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios.", status: 400 });
    }

    const sql = "INSERT INTO relatorio_roteiro_guarda (configurado, config_servico_id, sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, sdTpArmamento, sdNrArmamento, sdQtdMun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [configurado, configServicoId, sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, motTpArmamento, motNrArmamento, motQtdMun], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: "Erro ao inserir os dados.", status: 500 });
        }

        return res.status(201).json({ message: "Dados inseridos com sucesso!" });
    });
});

// Rota para selecionar os dados por ID
router.get("/relatorio_roteiro_guarda/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM relatorio_roteiro_guarda WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para atualizar dados (UPDATE) - Dados que já estão inseridos no roteiro  do roteiro
router.put("/relatorio_roteiro_guarda/updateRoteiro/:id", (req, res) => {
    const id = req.params.id;
    const { sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, sdTpArmamento, sdNrArmamento, sdQtdMun } = req.body;
    
    // Validação dos dados
    if (!sgtTpArmamento || !sgtNrArmamento || !sgtQtdMun || !cbTpArmamento || !cbNrArmamento || !cbQtdMun || !sdTpArmamento || !sdNrArmamento || !sdQtdMun ) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const sql = "UPDATE relatorio_roteiro_guarda SET sgtTpArmamento=?, sgtNrArmamento=?, sgtQtdMun=?, cbTpArmamento=?, cbNrArmamento=?, cbQtdMun=?, sdTpArmamento=?, sdNrArmamento=?, sdQtdMun=? WHERE id=?";

    db.query(sql, [sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, sdTpArmamento, sdNrArmamento, sdQtdMun, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para atualizar dados (UPDATE) - Dados da escala de ronda - alterações
router.put("/relatorio_roteiro_guarda/alteracao/:id", (req, res) => {
    const id = req.params.id;
    const { alteracao } = req.body;

    const sql = "UPDATE relatorio_roteiro_guarda SET relatorio_ronda_observacao=? WHERE id=?";

    db.query(sql, [alteracao, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

module.exports = router;