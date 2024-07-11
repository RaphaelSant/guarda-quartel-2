import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../components/impressao/css/PrintLandscape.module.css";
import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import {
    EditarRegistros,
    Imprimir,
} from "../../../components/botao";
import clearForm from "../../../components/util/clearForm";
import dbConfig from "../../../components/util/dbConfig";

export default function RelatorioEscalaRonda() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/pelotao_viatura
            const res = await fetch(`${dbConfig()}/configuracao_servico/servico_configurado`);

            // Converte a resposta da requisição para o formato JSON
            const fetchedData = await res.json();

            // Atualiza o estado 'data' do componente com os dados obtidos da API
            setData(fetchedData);
        } catch (err) {
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(err)
            console.log(err);
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função fetchData para buscar dados da API e atualizar o estado 'data'
        fetchData();
    }, []);

    // Utilidades para o modal de EDIÇÃO / ATUALIZAÇÃO
    const [id, setId] = useState([]);
    const [alteracao, setAlteracao] = useState([]);

    // Busca de dados por Id para a edição
    const buscarDadosPorId = async () => {
        try {
            // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
            const response = await axios.get(`${dbConfig()}/configuracao_servico/servico_configurado`);
            const data = response.data[0];
            // Cria uma instância de um modal usando Bootstrap
            const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));
            
            // Verifica se há dados retornados antes de definir os estados para evitar erros
            if (data) {

                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setAlteracao(data.relatorio_ronda_observacao || "");

                // Mostra o modal de edição após definir os estados com os dados
                editModal.show();
            }

        } catch (error) {
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(error);
            console.error("Erro ao buscar dados:", error);
        }
    };

    // Ao clicar no botão atualizar dados do modal de edição essa função será executada
    const atualizarDadosPorId = async (id) => {
        try {
            // Envia uma requisição PUT para atualizar os dados do registro com o ID fornecido
            const response = await axios.put(`${dbConfig()}/escala_ronda`, {
                // Envia os dados a serem atualizados no corpo da requisição
                alteracao
            });

            // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
            alert(response.data.message);

            // Limpa o formulário após a atualização dos dados
            clearForm();

            await fetchData();

            // Retorna os dados da resposta da requisição
            return response.data;
        } catch (error) {
            const mensagem = error.response.data.message;
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(mensagem);

            // Lança o erro novamente para ser tratado por quem chamou essa função
            // throw error;
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Página Inicial</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Escala de ronda do comandante da guarda
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Escala de ronda do comandante da guarda</p>
            <div className="text-center mb-4 d-print-none">
                <EditarRegistros click={() => buscarDadosPorId(1)} />
            </div>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="Escala de ronda do comandante da guarda" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">Horário</th>
                            <th scope="col">P1</th>
                            <th scope="col">P2</th>
                            <th scope="col">P3</th>
                            <th scope="col">Assinatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">21h</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">01h</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">03h</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">05h</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="container ms-0 p-0">
                    {data.map((alteracao) => {
                        return (

                            <p key={alteracao.id} className="text-justify">
                                <b>Alterações:</b> {alteracao.relatorio_ronda_observacao}
                            </p>

                        );
                    })}
                </div>

                <Imprimir impressao="paisagem" />
                <ImpressaoFooter />
            </div>

            {/* MODAL Editar Registro*/}
            <div className="modal fade" id="editarRegistro" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editarRegistroLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editarRegistroLabel"><FontAwesomeIcon icon={faPenToSquare} className="me-2" /> Editar Registro</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="modal-body">
                            <form
                                className="row g-3 needs-validation"
                                id="needs-validation"
                                noValidate
                            >
                                <div className="col-md-12">
                                    <label htmlFor="alteracoes" className="form-label">
                                        Alterações:
                                    </label>
                                    <textarea
                                        required
                                        type="text"
                                        className="form-control"
                                        value={alteracao}
                                        onChange={(e) => setAlteracao(e.target.value)}
                                        id="alteracoes"
                                        rows="3"></textarea>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={clearForm} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={(e) => atualizarDadosPorId(1)} className="btn btn-md btn-success">Atualizar Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
