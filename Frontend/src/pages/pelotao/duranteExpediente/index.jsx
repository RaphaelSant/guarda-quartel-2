import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../components/impressao/css/PrintPortrait.module.css";
import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import {
    Imprimir,
    NovoRegistro2,
} from "../../../components/botao";
import clearForm from "../../../components/util/clearForm";
import { formatDate, formatTime } from "../../../components/util/formatDateTime";

export default function PelotaoDuranteExpediente() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Efeito que busca os dados no banco e salva no estado 'data'
    // Atualiza os dados da página após um UPDATE no banco
    useEffect(() => {
        // Executa um efeito após a renderização inicial do componente

        // Faz uma requisição para buscar dados de uma API em http://localhost:8081/pelotao_durante_expediente
        fetch("http://localhost:8081/pelotao_durante_expediente")
            // Converte a resposta para JSON
            .then((res) => res.json())
            // Define os dados recebidos no estado 'data' do componente
            .then((data) => setData(data))
            // Captura e lida com erros, caso ocorram na requisição
            .catch((err) => console.log(err));
    }), [];

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/pelotao_durante_expediente
            const res = await fetch("http://localhost:8081/pelotao_durante_expediente");

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

    // Registro do civil pelo modal:
    const handleRegistrarSubmit = async (event) => {

        // Previne o comportamento padrão do formulário ao ser submetido (evita atualziar a página)
        event.preventDefault();

        // Coleta os valores dos campos do formulário
        const postoGraduacaoRegistro = document.getElementById('pg').value;
        const nomeGuerraRegistro = document.getElementById('nome-guerra').value;
        const idtMilitarRegistro = document.getElementById('idt-mil').value;
        const dataEntradaRegistro = document.getElementById('data-entrada').value;
        const horaEntradaRegistro = document.getElementById('hora-entrada').value;
        const origemRegistro = document.getElementById('origem').value;

        // Organiza os dados coletados em um objeto
        const dados = {
            postoGraduacaoRegistro,
            nomeGuerraRegistro,
            idtMilitarRegistro,
            dataEntradaRegistro,
            horaEntradaRegistro,
            origemRegistro,
        };

        try {
            // Envia uma requisição POST para adicionar um novo registro
            const response = await fetch('http://localhost:8081/pelotao_durante_expediente', {
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
            fetchData();

        } catch (error) {
            // Em caso de erro na requisição, exibe um alerta
            alert('Erro:', error);
        }
    };

    // Utilidades para o modal de EDIÇÃO / ATUALIZAÇÃO
    const [id, setId] = useState([]);
    const [pg, setPG] = useState([]);
    const [nomeGuerra, setNomeGuerra] = useState([]);
    const [idtMil, setIdtMil] = useState([]);
    const [dataEntrada, setDataEntrada] = useState([]);
    const [horaEntrada, setHoraEntrada] = useState([]);
    const [horaSaida, setHoraSaida] = useState([]);
    const [origem, setOrigem] = useState([]);
    // Busca de dados por Id para a edição
    const buscarDadosPorId = async (id) => {
        try {
            // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
            const response = await axios.get(`http://localhost:8081/pelotao_durante_expediente/selectId/${id}`);
            const data = response.data;

            // Cria uma instância de um modal usando Bootstrap
            const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));

            // Verifica se há dados retornados antes de definir os estados para evitar erros
            if (data) {

                // Formata a data de entrada para o formato 'yyyy-MM-dd'
                const dataEntrada = format(new Date(data.dataEntrada), 'yyyy-MM-dd');

                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setPG(data.pg || "");
                setNomeGuerra(data.nomeGuerra || "");
                setIdtMil(data.idtMil || "");
                setDataEntrada(dataEntrada || "");
                setHoraEntrada(data.horaEntrada || "");
                setHoraSaida(data.horaSaida || "");
                setOrigem(data.origem || "");

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
            const response = await axios.put(`http://localhost:8081/pelotao_durante_expediente/${id}`, {
                // Envia os dados a serem atualizados no corpo da requisição
                pg,
                nomeGuerra,
                idtMil,
                dataEntrada,
                horaEntrada,
                horaSaida,
                origem
            });

            // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
            alert(response.data.message);

            // Limpa o formulário após a atualização dos dados
            clearForm();

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
            const response = await fetch(`http://localhost:8081/pelotao_durante_expediente/${id}`, {
                method: 'DELETE', // Utiliza o método DELETE para indicar a exclusão do recurso
            });

            // Converte a resposta da requisição para JSON
            const data = await response.json();

            // Exibe um alerta da mensagem retornada após a exclusão (mensagem de sucesso ou erro)
            alert(data.message);
        } catch (error) {
            // Em caso de erro na requisição, Exibe um alerta
            alert('Erro:', error)
        }
    };

    // Função executada ao clicar no botao Deletar
    const handleDeleteRegistro = (id, pg, nomeGuerra) => {
        // Exibe um diálogo de confirmação ao usuário, mostrando os detalhes do registro que será excluído
        const shouldDelete = window.confirm(
            `Tem certeza de que deseja excluir este registro? PG: ${pg} Nome: ${nomeGuerra}`
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
                        <li className="breadcrumb-item active" aria-current="page">
                            Militares do pelotão durante o expediente
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de militares do pelotão durante o expediente</p>
            <div className="text-center mb-4 d-print-none">
                <NovoRegistro2 />
            </div>
            <div
                className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}
            >
                <ImpressaoHeader titulo="Entrada e saída de militares do pelotão durante o expediente" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">PG</th>
                            <th scope="col">Nome Guerra</th>
                            <th scope="col">Idt Mil</th>
                            <th scope="col">Data</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Origem/Destino</th>
                            <th scope="col" className="d-print-none">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dados) => {
                            let id = dados.id;
                            return (
                                <tr key={dados.id} className="align-middle">
                                    <td>{dados.pg}</td>

                                    <td>{dados.nomeGuerra}</td>

                                    <td>{dados.idtMil}</td>
                                    <td>{formatDate(dados.dataEntrada)}</td>
                                    <td>{formatTime(dados.horaEntrada)}</td>
                                    <td className={`${dados.horaSaida === null || dados.horaSaida === '00:00:00' ? "bg-danger text-white fw-bold" : ""}`}>
                                        {dados.horaSaida === null || dados.horaSaida === '00:00:00' ? 'OM' : formatTime(dados.horaSaida)}</td>
                                    <td>{dados.origem}</td>

                                    <td className="d-print-none">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div>

                                                <button className="bnt-acao" onClick={() => buscarDadosPorId(id)} >
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                        color="#FFD700"
                                                    />
                                                </button>

                                            </div>
                                            <div>
                                                <button
                                                    className="bnt-acao"
                                                    onClick={() =>
                                                        handleDeleteRegistro(id, dados.pg, dados.nomeGuerra)
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faTrash} color="#FF0000" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Imprimir impressao="retrato" />
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
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="pg">Posto Graduação</label>
                                    <select className="form-select" id="pg" >
                                        <option defaultValue={"Posto/Graduação"}>Posto/Graduação</option>
                                        <option value="Soldado">Soldado</option>
                                        <option value="Taifeiro">Taifeiro</option>
                                        <option value="Cabo">Cabo</option>
                                        <option value="Sargento">Sargento</option>
                                        <option value="Subtenente">Subtenente</option>
                                        <option value="Aspirante a Oficial">Aspirante a Oficial</option>
                                        <option value="Tenente">Tenente</option>
                                        <option value="Capitão">Capitão</option>
                                        <option value="Major">Major</option>
                                        <option value="Tenente-Coronel">Tenente-Coronel</option>
                                        <option value="Coronel">Coronel</option>
                                        <option value="General de Brigada">General de Brigada</option>
                                        <option value="General de Divisão">General de Divisão</option>
                                        <option value="General de Exército">General de Exército</option>
                                        <option value="Marechal">Marechal</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="nome-guerra" className="form-label">
                                        Nome de guerra
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome de guerra"
                                        id="nome-guerra"
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="idt-mil" className="form-label">
                                        Identidade Militar
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="idt-mil"
                                        placeholder="N° da identidade"
                                        name="idt-mil"
                                        maxLength="50"
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="data-entrada" className="form-label">
                                        Data de Entrada
                                    </label>
                                    <input
                                        type="date"
                                        data-format="00/00/0000"
                                        className="form-control"
                                        id="data-entrada"
                                        placeholder="Insira a data de entrada"
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="hora-entrada" className="form-label">
                                        Horário de Entrada
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-entrada"
                                        placeholder="Insira o horário de entrada"
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="origem" className="form-label">
                                        Origem / Destino
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="origem"
                                        placeholder="Insira o Origem / Destino"
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
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
                                    <label className="form-label" htmlFor="pg">Posto Graduação</label>
                                    <select className="form-select" id="pg" value={pg.toString()} onChange={(e) => setPG(e.target.value)}>
                                        <option value="">Selecione o Posto</option>
                                        <option value="Soldado">Soldado</option>
                                        <option value="Taifeiro">Taifeiro</option>
                                        <option value="Cabo">Cabo</option>
                                        <option value="Sargento">Sargento</option>
                                        <option value="Subtenente">Subtenente</option>
                                        <option value="Aspirante a Oficial">Aspirante a Oficial</option>
                                        <option value="Tenente">Tenente</option>
                                        <option value="Capitão">Capitão</option>
                                        <option value="Major">Major</option>
                                        <option value="Tenente-Coronel">Tenente-Coronel</option>
                                        <option value="Coronel">Coronel</option>
                                        <option value="General de Brigada">General de Brigada</option>
                                        <option value="General de Divisão">General de Divisão</option>
                                        <option value="General de Exército">General de Exército</option>
                                        <option value="Marechal">Marechal</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="nome-guerra" className="form-label">
                                        Nome de guerra
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome completo"
                                        id="nome-guerra"
                                        required
                                        value={nomeGuerra}
                                        onChange={(e) => setNomeGuerra(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="idtMil" className="form-label">
                                        Identidade Militar
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="idtMil"
                                        placeholder="N° da Identidade Militar"
                                        maxLength="14"
                                        value={idtMil}
                                        onChange={(e) => setIdtMil(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="data-entrada" className="form-label">
                                        Data de Entrada
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data-entrada"
                                        value={dataEntrada}
                                        onChange={(e) => setDataEntrada(e.target.value)}
                                        placeholder="Insira a data de entrada"
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-3">
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
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="hora-saida" className="form-label">
                                        Horário de Saída
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-saida"
                                        placeholder="Insira o horário de entrada"
                                        value={horaSaida}
                                        onChange={(e) => setHoraSaida(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="origem" className="form-label">
                                        Origem / Destino
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="origem"
                                        placeholder="Insira o origem"
                                        value={origem}
                                        onChange={(e) => setOrigem(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
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
