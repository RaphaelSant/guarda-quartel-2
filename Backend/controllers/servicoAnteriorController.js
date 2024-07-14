const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário em serviço anterior

// REGISTRO CIVIL A PÉ
router.get("/servico_anterior_civis_pe/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT cp.cpf, cp.dataEntrada, cp.destino, cp.horaEntrada, cp.horaSaida, cp.id, cp.nome FROM civis_pe cp INNER JOIN config_servico cs ON cp.config_servico_id = cs.id WHERE cs.servico_ref = ? order by cp.dataEntrada, cp.horaEntrada";
    db.query(sql, date, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// REGISTRO VEÍCULOS CIVIS
router.get("/servico_anterior_veiculo_civis/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT cv.cnh, cv.dataEntrada, cv.destino, cv.horaEntrada, cv.horaSaida, cv.id, cv.nome, cv.placa FROM civis_veiculo cv INNER JOIN config_servico cs ON cv.config_servico_id = cs.id WHERE cs.servico_ref = ? order by cv.dataEntrada, cv.horaEntrada";
    db.query(sql, date, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// PELOTÃO DURANTE O EXPEDIENTE
router.get("/servico_anterior_pelotao_durante_expediente/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT pde.pg, pde.nomeGuerra, pde.idtMil, pde.dataEntrada, pde.horaEntrada, pde.horaSaida, pde.origem, pde.id FROM pelotao_durante_expediente pde INNER JOIN config_servico cs ON pde.config_servico_id = cs.id WHERE cs.servico_ref = ? order by pde.dataEntrada, pde.horaEntrada";
    db.query(sql, date, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// PELOTÃO FORA DE EXPEDIENTE
router.get("/servico_anterior_pelotao_fora_expediente/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT pfe.pg, pfe.nomeGuerra, pfe.idtMil, pfe.dataEntrada, pfe.horaEntrada, pfe.horaSaida, pfe.origem, pfe.id FROM pelotao_fora_expediente pfe INNER JOIN config_servico cs ON pfe.config_servico_id = cs.id WHERE cs.servico_ref = ? order by pfe.dataEntrada, pfe.horaEntrada";
    db.query(sql, date, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// PELOTÃO ENTRADA E SAIDA DE VIATURAS
router.get("/servico_anterior_pelotao_viatura/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT pv.vtr, pv.odmEntrada, pv.odmSaida, pv.dataRegistro, pv.horaEntrada, pv.horaSaida, pv.motorista, pv.chefeVtr, pv.destino, pv.id FROM pelotao_viatura pv INNER JOIN config_servico cs ON pv.config_servico_id = cs.id WHERE cs.servico_ref = ? order by pv.dataRegistro, pv.horaEntrada";
    db.query(sql, date, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});



module.exports = router;