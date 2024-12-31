import React, { useEffect, useState } from "react";
import '../../../css/geral.css';
import Navbar from "../../../components/navbar";
import { Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Table, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import dbConfig from "../../../components/util/dbConfig";
import { formatDate, formatTime } from "../../../components/util/formatDateTime";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";
import Footer from "../../../components/footer";



export default function ConsultarFichaViatura() {

    const [apresentarse, setApresentarse] = useState([]);
    const [chVtr, setChVtr] = useState([]);
    const [combustivel, setCombustivel] = useState([]);
    const [dataSaida, setDataSaida] = useState([]);
    const [eb, setEb] = useState([]);
    const [horaSaida, setHoraSaida] = useState([]);
    const [id, setId] = useState([]);
    const [itinerario, setItinerario] = useState([]);
    const [motNome, setMotNome] = useState([]);
    const [naturezaSv, setNaturezaSv] = useState([]);
    const [odmSaida, setOdmSaida] = useState([]);
    const [porOrdem, setPorOrdem] = useState([]);
    const [velMax, setVelMax] = useState([]);
    const [viatura, setViatura] = useState([]);

    // Busca de dados por Id para a edição
    const buscarDadosPorId = async (id) => {

        try {
            const response = await axios.get(`${dbConfig()}/ficha_viatura/selectId/${id}`);
            const data = response.data;
            const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));

            if (data) {
                // Formata a data de entrada para o formato 'yyyy-MM-dd'
                // const dataEntrada = format(new Date(data.dataEntrada), 'yyyy-MM-dd');
                const dataSaida = format(new Date(data.data), 'yyyy-MM-dd');

                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setApresentarse(data.apresentarse);
                setChVtr(data.chVtr || "");
                setCombustivel(data.combustivel || "");
                setDataSaida(dataSaida || "");
                setEb(data.eb || "");
                setHoraSaida(data.horaSaida || "");
                setItinerario(data.itinerario || "");
                setMotNome(data.motNome || "");
                setNaturezaSv(data.naturezaSv || "");
                setOdmSaida(data.odmSaida || "");
                setPorOrdem(data.porOrdem || "");
                setVelMax(data.velMax || "");
                setViatura(data.viatura || "");

                editModal.show();  // Tente exibir o modal
                // console.log("Dados obtidos:", data, dataSaida);  // Verifique se os dados estão sendo carregados corretamente
            }
        } catch (error) {
            toast.error(error);
        }
    }

    // Ao clicar no botão atualizar dados do modal de edição essa função será executada
    const atualizarDadosPorId = async (id) => {

        console.log(id);

        try {
            // Envia uma requisição PUT para atualizar os dados do registro com o ID fornecido
            const response = await axios.put(`${dbConfig()}/ficha_viatura/${id}`, {
                // Envia os dados a serem atualizados no corpo da requisição
                apresentarse,
                chVtr,
                combustivel,
                dataSaida,
                eb,
                horaSaida,
                id,
                itinerario,
                motNome,
                naturezaSv,
                odmSaida,
                porOrdem,
                velMax,
                viatura
            });

            // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
            // alert(response.data.message);
            // toast.success(response.data.message);
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            });
            await fetchData();

            // Retorna os dados da resposta da requisição
            return response.data;
        } catch (error) {
            const msg = error.response.data.message;
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            //alert('Erro ao atualizar dados:', msg);
            // toast.error(msg);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            });
            // alert(`Erro ao atualizar dados: ${msg}`);
            // console.log('Erro ao atualizar dados:', msg);

            // Lança o erro novamente para ser tratado por quem chamou essa função
            throw error;
        }
    };

    // Função para deletar um registro pelo ID
    const deleteRegistro = async (id) => {
        // Envia uma requisição DELETE para a URL específica do ID fornecido
        try {
            const response = await fetch(`${dbConfig()}/civis_pe/${id}`, {
                method: 'DELETE', // Utiliza o método DELETE para indicar a exclusão do recurso
            });

            // Converte a resposta da requisição para JSON
            const data = await response.json();

            await fetchData();

            // Exibe um alerta da mensagem retornada após a exclusão (mensagem de sucesso ou erro)
            // alert(data.message);
        } catch (error) {
            // Em caso de erro na requisição, Exibe um alerta
            // toast.error(error);
        }
    };

    // Função executada ao clicar no botao Deletar
    const handleDeleteRegistro = (id, nome, cpf) => {
        Swal.fire({
            title: 'Tem certeza de que deseja excluir este registro?',
            html: `Nome: ${nome} <br> CPF: ${cpf}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-primary btn-lg',
                cancelButton: 'btn btn-secondary btn-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRegistro(id);
                Swal.fire({
                    title: 'Excluído!',
                    text: 'O registro foi excluído com sucesso.',
                    icon: 'success',
                    customClass: {
                        title: 'success-title',
                        popup: 'success-popup',
                        confirmButton: 'btn btn-primary btn-lg',
                        content: 'success-content'
                    }
                });
            }
        });
    };

    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API
            const res = await fetch(`${dbConfig()}/ficha_viatura`);

            // Converte a resposta da requisição para o formato JSON
            const fetchedData = await res.json();

            // Atualiza o estado 'data' do componente com os dados obtidos da API
            setData(fetchedData);
        } catch (err) {
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            toast.error(err);
            // console.log(err);
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função fetchData para buscar dados da API e atualizar o estado 'data'
        fetchData();
    }, []);


    // Estado para controlar a página atual e o número de itens por página
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Exibindo 5 itens por página

    // Calculando o índice de início e fim dos itens na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Pegando os itens da página atual
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Função para ir para a página seguinte
    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para ir para a página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Função para ir a uma página específica
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para gerar os números de página visíveis dinamicamente
    const getVisiblePageNumbers = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const maxVisiblePages = 20;

        // Determina o número inicial e final da página a ser exibida na paginação
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        let endPage = startPage + maxVisiblePages - 1;

        // Ajuste para não ultrapassar o número total de páginas
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePageNumbers = getVisiblePageNumbers();

    const handleClick = () => {
        Navigate("//ficha_viaturas/vizualizar_ficha");
    }

    // Função para tratar o clique no botão
    const consultarFicha = (id) => {
        // Salvar o id no localStorage
        localStorage.setItem('fichaId', id);

        // Redirecionar para a página específica, por exemplo, "ficha-detalle"
        window.location.href = "/ficha_viaturas/vizualizar_ficha";
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
                            <Link to="/ficha_viaturas">Ficha de Viatura</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Consultar Ficha de Viatura
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="container mt-2">
                <h1 className="text-center">Consultar Ficha de Viatura</h1>
                <hr />

                <Table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr>
                            <th>Motorista</th>
                            <th>Apresentar-se</th>
                            <th>Viatura</th>
                            <th>Placa</th>
                            <th>Data</th>
                            <th>Hora Saída</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((row) => (
                            <tr key={row.id}>
                                <td>{row.motNome}</td>
                                <td>{row.apresentarse}</td>
                                <td>{row.viatura}</td>
                                <td>{row.eb}</td>
                                <td>{formatDate(row.data)}</td>
                                <td>{formatTime(row.horaSaida)}</td>
                                <td className="d-print-none">
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div>
                                            <button className="bnt-acao" onClick={() => consultarFicha(row.id)}>
                                                <FontAwesomeIcon icon={faEye} color="#003aff" />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="bnt-acao" onClick={() => buscarDadosPorId(row.id)} >
                                                <FontAwesomeIcon icon={faPenToSquare} color="#FFD700" />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="bnt-acao" onClick={() => handleDeleteRegistro(civis.id, civis.nome, civis.cpf)}>
                                                <FontAwesomeIcon icon={faTrash} color="#FF0000" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="d-flex justify-content-center align-items-center">
                    {/* Paginação */}
                    <Pagination>
                        <Pagination.Prev onClick={prevPage} />
                        {visiblePageNumbers.map((number) => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => goToPage(number)}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
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
                            <form className="row g-3 was-validated">
                                <div className="col-md-4">
                                    <label htmlFor="motorista" className="form-label">
                                        Motorista
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Graduação e nome"
                                        id="motorista"
                                        required
                                        value={motNome}
                                        onChange={(e) => setMotNome(e.target.value)}
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="apresentarse" className="form-label">
                                        Apresentar-se
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Graduação e/ou nome"
                                        id="apresentarse"
                                        required
                                        value={apresentarse}
                                        onChange={(e) => setApresentarse(e.target.value)}
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="porOrdem" className="form-label">
                                        Por Ordem:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="porOrdem"
                                        placeholder="Por Ordem"
                                        value={porOrdem}
                                        onChange={(e) => setPorOrdem(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="viatura" className="form-label">
                                        Viatura:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="viatura"
                                        placeholder="Ex.: 50 km/h"
                                        value={viatura}
                                        onChange={(e) => setViatura(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="eb" className="form-label">
                                        EB:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="EB / Placa"
                                        id="eb"
                                        required
                                        value={eb}
                                        onChange={(e) => setEb(e.target.value)}
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="odometro" className="form-label">
                                        Odômetro
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="odometro"
                                        placeholder="Odômetro"
                                        value={odmSaida}
                                        onChange={(e) => setOdmSaida(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>                               

                                <div className="col-md-4">
                                    <label htmlFor="combustivel" className="form-label">
                                        Combustível
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex.: 80%"
                                        id="combustivel"
                                        required
                                        value={combustivel}
                                        onChange={(e) => setCombustivel(e.target.value)}
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="naturezaSv" className="form-label">
                                        Natureza do serviço
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex.: 80%"
                                        id="naturezaSv"
                                        required
                                        value={naturezaSv}
                                        onChange={(e) => setNaturezaSv(e.target.value)}
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="velMax" className="form-label">
                                        Velocidade Máxima:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="velMax"
                                        placeholder="Ex.: 50 km/h"
                                        value={velMax}
                                        onChange={(e) => setVelMax(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="data-entrada" className="form-label">
                                        Data Saída
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="data-entrada"
                                        value={dataSaida}
                                        onChange={(e) => setDataSaida(e.target.value)}
                                        placeholder="Insira a data de saída"
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hora-saida" className="form-label">
                                        Horário de Saída
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="hora-saida"
                                        placeholder="Horário de saída"
                                        value={horaSaida}
                                        onChange={(e) => setHoraSaida(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>
                                


                                <div className="col-md-12">
                                    <label htmlFor="itinerario" className="form-label">
                                        Intinerário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itinerario"
                                        placeholder="Insira o itinerário"
                                        value={itinerario}
                                        onChange={(e) => setItinerario(e.target.value)}
                                        required
                                    />
                                    <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                                    <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" onClick={(e) => atualizarDadosPorId(id)} className="btn btn-md btn-success">Atualizar Registro</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
