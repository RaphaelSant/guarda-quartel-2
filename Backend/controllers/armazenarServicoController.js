const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para apagar os dados das tabelas de origem
router.delete('/armazenar_servico_origem_delete', (req, res) => {
    const deleteQueries = [
        // Comandos DELETE adicionais aqui...
        'DELETE FROM civis_pe;',
        'DELETE FROM civis_veiculo;',
        'DELETE FROM oom_durante_expediente;',
        'DELETE FROM oom_fora_expediente;',
        'DELETE FROM oom_viatura;',
        'DELETE FROM pelotao_durante_expediente;',
        'DELETE FROM pelotao_fora_expediente;',
        'DELETE FROM pelotao_viatura;',
    ];

    const executeDeleteQueries = (queries, index = 0) => {
        if (index >= queries.length) {
            // Quando todas as consultas forem concluídas com sucesso
            return res.status(200).send('Todos os dados deletados com sucesso');
        }

        db.query(queries[index], (err, results) => {
            if (err) {
                console.error(`Erro ao deletar dados da consulta ${index + 1}:`, err);
                return res.status(500).send(`Erro ao deletar dados da consulta ${index + 1}`);
            }

            // console.log(`Dados da consulta ${index + 1} deletados com sucesso`);

            // Chama recursivamente para a próxima consulta após a atual ser concluída
            executeDeleteQueries(queries, index + 1);
        });
    };

    // Inicia a execução das consultas DELETE
    executeDeleteQueries(deleteQueries);
});

// Rota para apagar os dados das tabelas de destino
router.delete('/armazenar_servico_destino_delete', (req, res) => {
    const deleteQueries = [
        // Comandos DELETE adicionais aqui...
        'DELETE FROM bk_civis_pe;',
        'DELETE FROM bk_civis_veiculo;',
        'DELETE FROM bk_oom_durante_expediente;',
        'DELETE FROM bk_oom_fora_expediente;',
        'DELETE FROM bk_oom_viatura;',
        'DELETE FROM bk_pelotao_durante_expediente;',
        'DELETE FROM bk_pelotao_fora_expediente;',
        'DELETE FROM bk_pelotao_viatura;',
        'DELETE FROM bk_relatorio_parte_sgt;',
        'DELETE FROM bk_relatorio_roteiro_guarda;',
    ];

    const executeDeleteQueries = (queries, index = 0) => {
        if (index >= queries.length) {
            // Quando todas as consultas forem concluídas com sucesso
            return res.status(200).send('Todos os dados deletados com sucesso');
        }

        db.query(queries[index], (err, results) => {
            if (err) {
                console.error(`Erro ao deletar dados da consulta ${index + 1}:`, err);
                return res.status(500).send(`Erro ao deletar dados da consulta ${index + 1}`);
            }

            // console.log(`Dados da consulta ${index + 1} deletados com sucesso`);

            // Chama recursivamente para a próxima consulta após a atual ser concluída
            executeDeleteQueries(queries, index + 1);
        });
    };

    // Inicia a execução das consultas DELETE
    executeDeleteQueries(deleteQueries);
});

// Rota para copiar os dados das tabelas de origem
router.post('/armazenar_servico', (req, res) => {
    const copiaQueries = [
        // Comandos DELETE adicionais aqui...
        'INSERT INTO bk_civis_pe SELECT * FROM civis_pe;',
        'INSERT INTO bk_civis_veiculo SELECT * FROM civis_veiculo;',
        'INSERT INTO bk_oom_durante_expediente SELECT * FROM oom_durante_expediente;',
        'INSERT INTO bk_oom_fora_expediente SELECT * FROM oom_fora_expediente;',
        'INSERT INTO bk_oom_viatura SELECT * FROM oom_viatura;',
        'INSERT INTO bk_pelotao_durante_expediente SELECT * FROM pelotao_durante_expediente;',
        'INSERT INTO bk_pelotao_fora_expediente SELECT * FROM pelotao_fora_expediente;',
        'INSERT INTO bk_pelotao_viatura SELECT * FROM pelotao_viatura;',
        'INSERT INTO bk_relatorio_parte_sgt SELECT * FROM relatorio_parte_sgt;',
        'INSERT INTO bk_relatorio_roteiro_guarda SELECT * FROM relatorio_roteiro_guarda;',
    ];

    const executarCopiaOrigemQueries = (queries, index = 0) => {
        if (index >= queries.length) {
            // Quando todas as consultas forem concluídas com sucesso
            return res.status(200).send('Todos os dados copiados com sucesso');
        }

        db.query(queries[index], (err, results) => {
            if (err) {
                console.error(`Erro ao copiar dados da consulta ${index + 1}:`, err);
                return res.status(500).send(`Erro ao copiar dados da consulta ${index + 1}`);
            }

            // console.log(`Dados da consulta ${index + 1} copiados com sucesso`);

            // Chama recursivamente para a próxima consulta após a atual ser concluída
            executarCopiaOrigemQueries(queries, index + 1);
        });
    };

    // Inicia a execução das consultas DELETE
    executarCopiaOrigemQueries(copiaQueries);
});


module.exports = router;
