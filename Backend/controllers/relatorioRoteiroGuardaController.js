const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/relatorio_roteiro_guarda", (req, res) => {
    const sql = "SELECT * FROM relatorio_roteiro_guarda";
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

// Rota para atualizar dados (UPDATE) - Dados do roteiro
router.put("/relatorio_roteiro_guarda/:id", (req, res) => {
    const id = req.params.id;
    const { sgtNomeGuerra, sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbNomeGuerra, cbTpArmamento, cbNrArmamento, cbQtdMun, sdNomeGuerra, sdTpArmamento, sdNrArmamento, sdQtdMun, sdPrimeiroHorNome, sdSegundoHorNome, sdTerceiroHorNome } = req.body;

    // Validação dos dados
    if (!sgtNomeGuerra || !sgtTpArmamento || !sgtNrArmamento || !sgtQtdMun || !cbNomeGuerra || !cbTpArmamento || !cbNrArmamento || !cbQtdMun || !sdNomeGuerra || !sdTpArmamento || !sdNrArmamento || !sdQtdMun || !sdPrimeiroHorNome || !sdSegundoHorNome || !sdTerceiroHorNome) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const sql = "UPDATE relatorio_roteiro_guarda SET sgtNomeGuerra=?, sgtTpArmamento=?, sgtNrArmamento=?, sgtQtdMun=?, cbNomeGuerra=?, cbTpArmamento=?, cbNrArmamento=?, cbQtdMun=?, sdNomeGuerra=?, sdTpArmamento=?, sdNrArmamento=?, sdQtdMun=?, sdPrimeiroHorNome=?, sdSegundoHorNome=?, sdTerceiroHorNome=? WHERE id=?";

    db.query(sql, [sgtNomeGuerra, sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbNomeGuerra, cbTpArmamento, cbNrArmamento, cbQtdMun, sdNomeGuerra, sdTpArmamento, sdNrArmamento, sdQtdMun, sdPrimeiroHorNome, sdSegundoHorNome, sdTerceiroHorNome, id], (err, result) => {
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