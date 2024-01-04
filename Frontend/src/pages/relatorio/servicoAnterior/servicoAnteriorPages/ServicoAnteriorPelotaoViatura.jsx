import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../../components/impressao/css/PrintLandscape.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import {
    Imprimir,
    NovoRegistro2,
} from "../../../../components/botao";
import clearForm from "../../../../components/util/clearForm";
import { formatDate, formatTime } from "../../../../components/util/formatDateTime";
import dbConfig from "../../../../components/util/dbConfig";

export default function ServicoAnteriorPelotaoViatura() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/pelotao_viatura
            const res = await fetch(`${dbConfig()}/servico_anterior_pelotao_viatura`);

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

    // Registro de dados pelo modal
    const handleRegistrarSubmit = async (event) => {

        // Previne o comportamento padrão do formulário ao ser submetido (evita atualziar a página)
        event.preventDefault();

        // Coleta os valores dos campos do formulário
        const vtrRegistro = document.getElementById('vtr').value;
        const odmSaidaRegistro = document.getElementById('odm-saida').value;
        const odmEntradaRegistro = document.getElementById('odm-entrada').value;
        const dataRegistro = document.getElementById('data-registro').value;
        const horaSaidaRegistro = document.getElementById('hora-saida').value;
        const horaEntradaRegistro = document.getElementById('hora-entrada').value;
        const motoristaRegistro = document.getElementById('motorista').value;
        const chefeVtrRegistro = document.getElementById('chefe-viatura').value;
        const destinoRegistro = document.getElementById('destino').value;

        // Organiza os dados coletados em um objeto
        const dados = {
            vtrRegistro,
            odmSaidaRegistro,
            odmEntradaRegistro,
            dataRegistro,
            horaSaidaRegistro,
            horaEntradaRegistro,
            motoristaRegistro,
            chefeVtrRegistro,
            destinoRegistro,
        };

        try {
            // Envia uma requisição POST para adicionar um novo registro
            const response = await fetch(`${dbConfig()}/pelotao_viatura`, {
                // Utiliza o método POST
                method: 'POST',
                headers: {
                    // Define o tipo de conteúdo como JSON
                    'Content-Type': 'application/json',
                },
                // Converte o objeto 'dados' para JSON e o envia no corpo da requisição
                body: JSON.stringify(dados),
            });

            // Converte a resposta da requisição para JSON
            const responseData = await response.json();

            // Limpa o formulário após a inserção
            clearForm();

            // Exibe um alerta com a mensagem recebida do servidor após a inserção
            alert(responseData.message);

            // Atualiza os dados na tela após a inserção 
            // (supõe-se que fetchData() é uma função que busca os dados atualizados)
            await fetchData();

        } catch (error) {
            // Em caso de erro na requisição, exibe um alerta
            alert('Erro:', error);
        }
    };

    // Utilidades para o modal de EDIÇÃO / ATUALIZAÇÃO
    const [id, setId] = useState([]);
    const [vtr, setVtr] = useState([]);
    const [odmSaida, setOdmSaida] = useState([]);
    const [odmEntrada, setOdmEntrada] = useState([]);
    const [dataRegistro, setDataRegistro] = useState([]);
    const [horaSaida, setHoraSaida] = useState([]);
    const [horaEntrada, setHoraEntrada] = useState([]);
    const [motorista, setMotorista] = useState([]);
    const [chefeVtr, setChefeVtr] = useState([]);
    const [destino, setDestino] = useState([]);
    // Busca de dados por Id para a edição
    const buscarDadosPorId = async (id) => {
        try {
            // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
            const response = await axios.get(`${dbConfig()}/pelotao_viatura/selectId/${id}`);
            const data = response.data;

            // Cria uma instância de um modal usando Bootstrap
            const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));

            // Verifica se há dados retornados antes de definir os estados para evitar erros
            if (data) {

                // Formata a data de entrada para o formato 'yyyy-MM-dd'
                const dataRegistro = format(new Date(data.dataRegistro), 'yyyy-MM-dd');

                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setVtr(data.vtr || "");
                setOdmSaida(data.odmSaida || "");
                setOdmEntrada(data.odmEntrada || "");
                setDataRegistro(dataRegistro || "");
                setHoraSaida(data.horaSaida || "");
                setHoraEntrada(data.horaEntrada || "");
                setMotorista(data.motorista || "");
                setChefeVtr(data.chefeVtr || "");
                setDestino(data.destino || "");

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
            const response = await axios.put(`${dbConfig()}/pelotao_viatura/${id}`, {
                // Envia os dados a serem atualizados no corpo da requisição
                vtr,
                odmSaida,
                odmEntrada,
                dataRegistro,
                horaSaida,
                horaEntrada,
                motorista,
                chefeVtr,
                destino,
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

    // Função para deletar um registro pelo ID
    const deleteRegistro = async (id) => {
        // Envia uma requisição DELETE para a URL específica do ID fornecido
        try {
            const response = await fetch(`${dbConfig()}/pelotao_viatura/${id}`, {
                method: 'DELETE', // Utiliza o método DELETE para indicar a exclusão do recurso
            });

            // Converte a resposta da requisição para JSON
            const data = await response.json();

            await fetchData();

            // Exibe um alerta da mensagem retornada após a exclusão (mensagem de sucesso ou erro)
            alert(data.message);
        } catch (error) {
            // Em caso de erro na requisição, Exibe um alerta
            alert('Erro:', error)
        }
    };

    // Função executada ao clicar no botao Deletar
    const handleDeleteRegistro = (id, vtr, motorista) => {
        // Exibe um diálogo de confirmação ao usuário, mostrando os detalhes do registro que será excluído
        const shouldDelete = window.confirm(
            `Tem certeza de que deseja excluir este registro? Motorista: ${vtr} Placa / EB: ${motorista}`
        );

        if (shouldDelete) {
            // Chama a função de exclusão se o usuário confirmar
            deleteRegistro(id);
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
                        <li className="breadcrumb-item">
                            <Link to="/relatorio_servico_anterior">Serviço Anterior</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Viaturas do pelotão
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de viaturas do pelotão</p>
            
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="Entrada e saída de viaturas do pelotão" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col" rowSpan={'2'}>Vtr - OM</th>
                            <th scope="col" colSpan={'2'}>Odômetro</th>
                            <th scope="col" rowSpan={'2'}>Data</th>
                            <th scope="col" colSpan={'2'}>Horário</th>
                            <th scope="col" rowSpan={'2'}>Motorista</th>
                            <th scope="col" rowSpan={'2'}>Chefe de Vtr / Acompanhante</th>
                            <th scope="col" rowSpan={'2'}>Destino</th>
                        </tr>
                        <tr className="align-middle">
                            <th scope="col">Saída</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Entrada</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((dados) => {
                            let id = dados.id;
                            return (
                                <tr key={dados.id} className="align-middle">
                                    <td>{dados.vtr}</td>
                                    <td>{dados.odmSaida === null || dados.odmSaida === '' ? '- - -' : dados.odmSaida}</td>
                                    <td>{dados.odmEntrada === null || dados.odmEntrada === '' ? '- - -' : dados.odmEntrada}</td>
                                    <td>{formatDate(dados.dataRegistro)}</td>
                                    <td>{dados.horaSaida === null || dados.horaSaida === '00:00:00' ? '- - -' : formatTime(dados.horaSaida)}</td>
                                    <td>{dados.horaEntrada === null || dados.horaEntrada === '00:00:00' ? '- - -' : formatTime(dados.horaEntrada)}</td>
                                    <td>{dados.motorista}</td>
                                    <td>{dados.chefeVtr}</td>
                                    <td>{dados.destino}</td>
                                    
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
                <Imprimir impressao="paisagem" />
                <ImpressaoFooter />
            </div>

            {/* MODAL Novo Registro*/}
            <div className="modal fade" id="novoRegistro" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="novoRegistroLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="novoRegistroLabel"><FontAwesomeIcon icon={faPlus} className="me-2" /> Novo Registro</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="modal-body">
                            <form
                                className="row g-3 needs-validation"
                                id="needs-validation"

                                noValidate
                            >
                                <div className="col-md-4">
                                    <label htmlFor="vtr" className="form-label">
                                        Placa / EB *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira a placa / EB"
                                        id="vtr"
                                        maxLength="20"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="odm-saida" className="form-label">
                                        Odm Saída
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="odm-saida"
                                        placeholder="Odm Saída"
                                        name="odm-saida"
                                        maxLength="20"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="odm-entrada" className="form-label">
                                        Odm Entrada
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="odm-entrada"
                                        placeholder="Odm Entrada"
                                        name="odm-entrada"
                                        maxLength="20"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="data-registro" className="form-label">
                                        Data do Registro *
                                    </label>
                                    <input
                                        type="date"
                                        data-format="00/00/0000"
                                        className="form-control"
                                        id="data-registro"
                                        placeholder="Insira a data de registro"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hora-saida" className="form-label">
                                        Horário de Saída
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-saida"
                                        placeholder="Insira o horário de saida"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hora-entrada" className="form-label">
                                        Horário de Entrada
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-entrada"
                                        placeholder="Insira o horário de saida"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="motorista" className="form-label">
                                        Motorista *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="motorista"
                                        placeholder="Nome do motorista"
                                        maxLength="50"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="chefe-viatura" className="form-label">
                                        Chefe de Vtr *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="chefe-viatura"
                                        placeholder="Nome do Ch Vtr"
                                        maxLength="50"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="destino" className="form-label">
                                        Destino *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="destino"
                                        placeholder="Insira o Destino"
                                        maxLength="50"
                                        required
                                    />
                                </div>

                                <div className="col-md-6"></div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={clearForm} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={handleRegistrarSubmit} className="btn btn-md btn-success">Registrar</button>
                        </div>
                        <div className="status"></div>
                    </div>
                </div>
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
                                <div className="col-md-4">
                                    <label htmlFor="nome-guerra" className="form-label">
                                        Placa / EB
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira a placa / EB"
                                        id="nome-guerra"
                                        required
                                        value={vtr}
                                        onChange={(e) => setVtr(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="odm-saida" className="form-label">
                                        Odm Saída
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="odm-saida"
                                        placeholder="Odm Saída"
                                        maxLength="20"
                                        value={odmSaida}
                                        onChange={(e) => setOdmSaida(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="odm-entrada" className="form-label">
                                        Odm Entrada
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="odm-entrada"
                                        placeholder="Odm Entrada"
                                        maxLength="20"
                                        value={odmEntrada}
                                        onChange={(e) => setOdmEntrada(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="data-registro" className="form-label">
                                        Data do Registro
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data-registro"
                                        value={dataRegistro}
                                        onChange={(e) => setDataRegistro(e.target.value)}
                                        placeholder="Insira a data de registro"
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hora-entrada" className="form-label">
                                        Horário de Saída
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-entrada"
                                        placeholder="Insira o horário de entrada"
                                        value={horaSaida}
                                        onChange={(e) => setHoraSaida(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hora-entrada" className="form-label">
                                        Horário de Entrada
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-entrada"
                                        placeholder="Insira o horário de entrada"
                                        value={horaEntrada}
                                        onChange={(e) => setHoraEntrada(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="motorista" className="form-label">
                                        Motorista
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="motorista"
                                        placeholder="Nome do motorista"
                                        value={motorista}
                                        onChange={(e) => setMotorista(e.target.value)}
                                        maxLength="50"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="ch-vtr" className="form-label">
                                        Chefe Vtr
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ch-vtr"
                                        placeholder="Nome do Chefe de Vtr"
                                        value={chefeVtr}
                                        onChange={(e) => setChefeVtr(e.target.value)}
                                        maxLength="50"
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="destino" className="form-label">
                                        Destino
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="destino"
                                        placeholder="Insira o destino"
                                        value={destino}
                                        onChange={(e) => setDestino(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-6"></div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={clearForm} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={(e) => atualizarDadosPorId(id)} className="btn btn-md btn-success">Atualizar Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
