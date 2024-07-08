import React, { useEffect, useState } from "react";
import '../../../css/geral.css';
import Navbar from "../../../components/navbar";
import dbConfig from "../../../components/util/dbConfig";
import { getLatestConfigServicoId } from "../../../components/configServico";

export default function NovoRoteiro() {
    // Estado para receber os dados gravados no BD
    const [dataConfigServico, setDataConfigServico] = useState({});

    // Função para buscar a configuração do serviço e atualizar o estado
    const configServico = async () => {
        try {
            // Obtém a última configuração de serviço
            const configId = await getLatestConfigServicoId();
            setDataConfigServico(configId);
            if (!configId) {
                throw new Error("Nenhuma configuração encontrada.");
            }
        } catch (error) {
            // Em caso de erro, exibe um alerta e retorna
            alert('Erro ao obter a configuração do serviço: ' + error.message);
            console.error("Erro ao obter a configuração do serviço:", error);
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função configServico para buscar a configuração do serviço e atualizar o estado 'dataConfigServico'
        configServico();
    }, []);

    // Create da configuração:
    const handleRegistrarSubmit = async (event) => {
        // Previne o comportamento padrão do formulário ao ser submetido (evita atualizar a página)
        event.preventDefault();

        // Coleta os valores dos campos do formulário
        const configurado = 1;
        const configServicoId = dataConfigServico.id;
        const sgtTpArmamento = document.getElementById('armt-sgt-permanencia').value;
        const sgtNrArmamento = document.getElementById('armt-nr-sgt').value;
        const sgtQtdMun = document.getElementById('qtd-municoes-sgt').value;
        const cbTpArmamento = document.getElementById('armt-cb-permanencia').value;
        const cbNrArmamento = document.getElementById('armt-nr-cb').value;
        const cbQtdMun = document.getElementById('qtd-municoes-cb').value;
        const motTpArmamento = document.getElementById('armt-mot-permanencia').value;
        const motNrArmamento = document.getElementById('armt-nr-mot').value;
        const motQtdMun = document.getElementById('qtd-municoes-mot').value;

        // Organiza os dados coletados em um objeto
        const dados = {
            configurado,
            configServicoId,
            sgtTpArmamento,
            sgtNrArmamento,
            sgtQtdMun,
            cbTpArmamento,
            cbNrArmamento,
            cbQtdMun,
            motTpArmamento,
            motNrArmamento,
            motQtdMun,
        };

        try {
            const response = await fetch(`${dbConfig()}/relatorio_roteiro_guarda`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            const responseData = await response.json();

            if (response.status === 201) {
                // Limpa o formulário após a inserção
                alert(responseData.message);
                window.location.href = "/relatorio_roteiro_guarda";
            }

        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="mt-4 text-center">Roteiro da guarda </h1>
                <p className="mt-3 text-center">Configuração inicial do roteiro da guarda de acordo com a <b>Configuração do Serviço</b>.</p>

                <form className="row g-3 was-validated mt-4" onSubmit={handleRegistrarSubmit}>
                    <h4>Sgt Permanência - {dataConfigServico.sgtNomeGuerra || 'Carregando...'}</h4>
                    <div className="col-md-4">
                        <label htmlFor="armt-sgt-permanencia" className="form-label">
                            Tipo de armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="armt-sgt-permanencia"
                            placeholder="Tipo de armamento"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="armt-nr-sgt" className="form-label">
                            Número do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="armt-nr-sgt"
                            placeholder="Número do armamento"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="qtd-municoes-sgt" className="form-label">
                            Quantidade de munições
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="qtd-municoes-sgt"
                            placeholder="Quantidade de munições"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <hr />

                    <h4>Cabo da guarda - {dataConfigServico.cbNomeGuerra || 'Carregando...'}</h4>
                    <div className="col-md-4">
                        <label htmlFor="armt-cb-permanencia" className="form-label">
                            Tipo de armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="armt-cb-permanencia"
                            placeholder="Tipo de armamento"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="armt-nr-cb" className="form-label">
                            Número do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="armt-nr-cb"
                            placeholder="Número do armamento"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="qtd-municoes-cb" className="form-label">
                            Quantidade de munições
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="qtd-municoes-cb"
                            placeholder="Quantidade de munições"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <hr />

                    <h4>Motorista - {dataConfigServico.motoristaNomeGuerra || 'Carregando...'}</h4>
                    <div className="col-md-4">
                        <label htmlFor="armt-mot-permanencia" className="form-label">
                            Tipo de armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="armt-mot-permanencia"
                            placeholder="Tipo de armamento"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="armt-nr-mot" className="form-label">
                            Número do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="armt-nr-mot"
                            placeholder="Número do armamento"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="qtd-municoes-mot" className="form-label">
                            Quantidade de munições
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="qtd-municoes-mot"
                            placeholder="Quantidade de munições"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <button className="btn btn-success" type="submit">Salvar</button>
                </form>
            </div>
        </>
    );
}
