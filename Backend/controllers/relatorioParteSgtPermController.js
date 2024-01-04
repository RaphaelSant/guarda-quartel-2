const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/relatorio_parte_sgt", (req, res) => {
    const sql = "SELECT * FROM relatorio_parte_sgt";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para ler (Read) os dados a serem exibidos para o usuário em serviço anterior
router.get("/servico_anterior_relatorio_parte_sgt", (req, res) => {
    const sql = "SELECT * FROM bk_relatorio_parte_sgt";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para selecionar os dados por ID
router.get("/relatorio_parte_sgt/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM relatorio_parte_sgt WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para atualizar dados (UPDATE) - Dados do roteiro
router.put("/relatorio_parte_sgt/:id", (req, res) => {
    const id = req.params.id;
    const {
        paradaDiaria,
        recebimentoServico,
        pessoalServico,
        consPonta,
        consPontaAnterior,
        consFPonta,
        consFPontaAnterior,
        consTotal,
        consTotalAnterior,
        rancho,
        lixeiras,
        armtMunicao,
        dependencias,
        claviculario,
        bombaAgua,
        revistaRecolher,
        radios,
        cameras,
        materialCarga,
        ocorrencias,
        correspondencias,
        viaturas,
        passagemServico
    } = req.body;

    const sql = "UPDATE relatorio_parte_sgt SET paradaDiaria=?, recebimentoServico=?, pessoalServico=?, consPonta=?, consPontaAnterior=?, consFPonta=?, consFPontaAnterior=?, consTotal=?, consTotalAnterior=?, rancho=?, lixeiras=?, armtMunicao=?, dependencias=?, claviculario=?, bombaAgua=?, revistaRecolher=?, radios=?, cameras=?, materialCarga=?, ocorrencias=?, correspondencias=?, viaturas=?, passagemServico=? WHERE id=?";

    db.query(sql, [
        paradaDiaria,
        recebimentoServico,
        pessoalServico,
        consPonta,
        consPontaAnterior,
        consFPonta,
        consFPontaAnterior,
        consTotal,
        consTotalAnterior,
        rancho,
        lixeiras,
        armtMunicao,
        dependencias,
        claviculario,
        bombaAgua,
        revistaRecolher,
        radios,
        cameras,
        materialCarga,
        ocorrencias,
        correspondencias,
        viaturas,
        passagemServico,
        id], (err, result) => {
            if (err) return res.status(500).send(err);

            return res.status(200).json({ message: "Dados atualizados com sucesso!" });
        });
});

module.exports = router;