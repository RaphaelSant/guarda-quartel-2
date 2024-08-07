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

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/configuracao_servico_dates", (req, res) => {
    const sql = "SELECT servico_ref FROM config_servico";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para ler (Read) os dados apenas do SERVIÇO CONFIGURADO
router.get("/configuracao_servico/servico_configurado", (req, res) => {
    const sql = "SELECT * FROM config_servico cs WHERE cs.configurado = 1";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para realizar novos registros de dados. (Create) - QUANDO SERVIÇO NÃO ESTIVER AINDA CONFIGURADO
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

// Rota para atualizar dados do menu "CONFIGURAÇÃO DO SERVIÇO" (UPDATE)
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

// Rota para atualizar dados do menu "ROTEIRO DA GUARDA" (UPDATE)
router.put("/roteiro_guarda", (req, res) => {
    const { sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, motoristaTpArmamento, motoristaNrArmamento, motoristaQtdMun } = req.body;

    // Validação dos dados
    if (!sgtTpArmamento || !sgtNrArmamento || !sgtQtdMun || !cbTpArmamento || !cbNrArmamento || !cbQtdMun) {
        return res.status(400).json({ message: "Existem campos obrigatórios!" });
    }

    const sql = "UPDATE config_servico cs SET sgtTpArmamento=?, sgtNrArmamento=?, sgtQtdMun=?, cbTpArmamento=?, cbNrArmamento=?, cbQtdMun=?, motoristaTpArmamento=?, motoristaNrArmamento=?, motoristaQtdMun=? WHERE cs.configurado=1";

    db.query(sql, [sgtTpArmamento, sgtNrArmamento, sgtQtdMun, cbTpArmamento, cbNrArmamento, cbQtdMun, motoristaTpArmamento, motoristaNrArmamento, motoristaQtdMun], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para atualizar dados do menu "ESCALA DE RONDA" (UPDATE)
router.put("/escala_ronda", (req, res) => {
    const { alteracao } = req.body;

    // Validação dos dados
    if (!alteracao) {
        return res.status(400).json({ message: "Campo obrigatório." });
    }

    const sql = "UPDATE config_servico cs SET relatorio_ronda_observacao=? WHERE cs.configurado=1";

    db.query(sql, [alteracao], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para atualizar dados do menu "PARTE SGT PERMANENCIA" (UPDATE)
router.put("/parte_sgt_permanencia", (req, res) => {
    // Desestruturação dos dados do corpo da requisição
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

    // Verificação simples se todos os campos necessários estão presentes
    if (!paradaDiaria ||
        !recebimentoServico ||
        !pessoalServico ||
        !consPonta ||
        !consPontaAnterior ||
        !consFPonta ||
        !consFPontaAnterior ||
        !consTotal ||
        !consTotalAnterior ||
        !rancho ||
        !lixeiras ||
        !armtMunicao ||
        !dependencias ||
        !claviculario ||
        !bombaAgua ||
        !revistaRecolher ||
        !radios ||
        !cameras ||
        !materialCarga ||
        !ocorrencias ||
        !correspondencias ||
        !viaturas ||
        !passagemServico) {
        // Adicione verificações adicionais conforme necessário
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    // String SQL para atualizar a tabela
    const sql = `
        UPDATE config_servico 
        SET paradaDiaria = ?, recebimentoServico = ?, pessoalServico = ?, consPonta = ?, 
            consPontaAnterior = ?, consFPonta = ?, consFPontaAnterior = ?, consTotal = ?, 
            consTotalAnterior = ?, rancho = ?, lixeiras = ?, armtMunicao = ?, dependencias = ?, 
            claviculario = ?, bombaAgua = ?, revistaRecolher = ?, radios = ?, cameras = ?, 
            materialCarga = ?, ocorrencias = ?, correspondencias = ?, viaturas = ?, passagemServico = ? 
        WHERE configurado = 1
    `;

    // Executa a consulta no banco de dados
    db.query(sql, [
        paradaDiaria, recebimentoServico, pessoalServico, consPonta,
        consPontaAnterior, consFPonta, consFPontaAnterior, consTotal,
        consTotalAnterior, rancho, lixeiras, armtMunicao, dependencias,
        claviculario, bombaAgua, revistaRecolher, radios, cameras,
        materialCarga, ocorrencias, correspondencias, viaturas, passagemServico
    ], (err, result) => {
        if (err) {
            // Retorna erro de servidor interno se ocorrer algum problema
            return res.status(500).send(err);
        }

        // Retorna sucesso se a atualização for bem-sucedida
        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para "FINALIZAR O SERVIÇO" (UPDATE)
router.put("/finaliza_servico", (req, res) => {

    const sql = "UPDATE config_servico cs SET cs.configurado=0 WHERE cs.configurado=1";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Serviço armazenado com sucesso!" });
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