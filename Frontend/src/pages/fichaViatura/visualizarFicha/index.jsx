import React, { useEffect, useState } from "react";
import '../../../css/geral.css';
import Navbar from "../../../components/navbar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import dbConfig from "../../../components/util/dbConfig";
import ImpressaoAnteriorHeader from "../../../components/impressao/impressaoAnteriorHeader";
import { formatDate } from "../../../components/util/formatDateTime";
import ministerioLogo from "../../../assets/img/ministerio-logo.jpg";


// Busca de dados por Id para a edição
const buscarDadosPorId = async (id) => {
    try {
        // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
        const response = await axios.get(`${dbConfig()}/civis_pe/selectId/${id}`);
        const data = response.data;

        // Cria uma instância de um modal usando Bootstrap
        const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));


        // Verifica se há dados retornados antes de definir os estados para evitar erros
        if (data) {

            // Formata a data de entrada para o formato 'yyyy-MM-dd'
            const dataEntrada = format(new Date(data.dataEntrada), 'yyyy-MM-dd');

            // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
            setId(data.id || "");
            setNome(data.nome || "");
            setCpf(data.cpf || "");
            setDataEntrada(dataEntrada || "");
            setDestino(data.destino || "");
            setHoraEntrada(data.horaEntrada || "");
            setHoraSaida(data.horaSaida || "");

            // Mostra o modal de edição após definir os estados com os dados
            editModal.show();
        }

    } catch (error) {
        // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
        toast.error(error);
        // alert(error);
        // console.error("Erro ao buscar dados:", error);
    }
};

// Ao clicar no botão atualizar dados do modal de edição essa função será executada
const atualizarDadosPorId = async (id) => {
    try {
        // Envia uma requisição PUT para atualizar os dados do registro com o ID fornecido
        const response = await axios.put(`${dbConfig()}/civis_pe/${id}`, {
            // Envia os dados a serem atualizados no corpo da requisição
            nome,
            cpf,
            dataEntrada,
            destino,
            horaEntrada,
            // Verifica se horaSaida está presente e não é uma string vazia, caso contrário, envia null
            horaSaida: horaSaida && horaSaida.trim() !== "" ? horaSaida : null,
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

console.log(localStorage.fichaId);

export default function VizualizarFichaViatura() {
    const [registroCpf, setRegistroCpf] = useState(['']);

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

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Página Inicial</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/ficha_viaturas">Ficha de Viatura</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/ficha_viaturas/consultar_ficha">Consultar de Viatura</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Vizualizar Ficha de Viatura
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-2 d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center">Vizualizar Ficha de Viatura</h1>
                <hr />

                <img
                    src={ministerioLogo}
                    width={"100px"}
                    alt="sdasd"
                    className="d-print-block"
                />

                <div className="d-print-block text-center">
                    <p>
                        <b>
                            Ministério da Defesa
                            <br />
                            Exército Brasileiro
                            <br />
                            17° Pelotão de Comunicações de Selva
                        </b>
                    </p>
                </div>
            </div>

        </>
    );
}
