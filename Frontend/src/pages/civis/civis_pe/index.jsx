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
import { cpfMask } from "../../../components/mask/cpf";

import Navbar from "../../../components/navbar";
import {
  Imprimir,
  NovoRegistro2,
} from "../../../components/botao";
import clearForm from "../../../components/util/clearForm";
import { formatDate, formatTime } from "../../../components/util/formatDateTime";
import dbConfig from "../../../components/util/dbConfig";

export default function CivisPe() {
  const [registroCpf, setRegistroCpf] = useState(['']);

  // Estado para receber os dados gravados no BD
  const [data, setData] = useState([]);

  // Função para buscar dados da API e atualizar o estado 'data'
  const fetchData = async () => {
    try {
      // Faz uma requisição para buscar dados da API
      const res = await fetch(`${dbConfig()}/civis_pe`);

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
  const [nome, setNome] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [dataEntrada, setDataEntrada] = useState([]);
  const [destino, setDestino] = useState([]);
  const [horaEntrada, setHoraEntrada] = useState([]);
  const [horaSaida, setHoraSaida] = useState([]);

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
      alert(error);
      console.error("Erro ao buscar dados:", error);
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
        horaSaida,
      });

      // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
      alert(response.data.message);

      await fetchData();

      // Retorna os dados da resposta da requisição
      return response.data;
    } catch (error) {
      // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
      alert('Erro ao atualizar dados:', error);
      console.error('Erro ao atualizar dados:', error);

      // Lança o erro novamente para ser tratado por quem chamou essa função
      throw error;
    }
  };

  // Registro do civil pelo modal:
  const handleRegistrarSubmit = async (event) => {

    // Previne o comportamento padrão do formulário ao ser submetido (evita atualziar a página)
    event.preventDefault();

    // Coleta os valores dos campos do formulário
    const cpf = document.getElementById('cpf').value;
    const dataEntrada = document.getElementById('data-entrada').value;
    const destino = document.getElementById('destino').value;
    const horaEntrada = document.getElementById('hora-entrada').value;
    const nome = document.getElementById('nome-completo').value;

    // Organiza os dados coletados em um objeto
    const dados = {
      cpf,
      dataEntrada,
      destino,
      horaEntrada,
      nome,
    };

    try {
      // Envia uma requisição POST para adicionar um novo registro
      const response = await fetch(`${dbConfig()}/civis_pe`, {
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
      setRegistroCpf('');

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
      alert(data.message);
    } catch (error) {
      // Em caso de erro na requisição, Exibe um alerta
      alert('Erro:', error)
    }
  };

  // Função executada ao clicar no botao Deletar
  const handleDeleteRegistro = (id, nome, cpf) => {
    // Exibe um diálogo de confirmação ao usuário, mostrando os detalhes do registro que será excluído
    const shouldDelete = window.confirm(
      `Tem certeza de que deseja excluir este registro? Nome: ${nome} CPF: ${cpf}`
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
              Registro de Civil
            </li>
          </ol>
        </nav>
      </div>
      <p className="text-center d-print-none">Entrada e saída de civis</p>
      <div className="text-center mb-4 d-print-none">
        <NovoRegistro2 />
      </div>
      <div
        className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}
      >
        <ImpressaoHeader titulo="Entrada e saída de civis" />

        <table className="table text-center table-bordered border-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Data</th>
              <th scope="col">Entrada</th>
              <th scope="col">Saída</th>
              <th scope="col">Destino</th>
              <th scope="col" className="d-print-none">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((civis) => {
              let id = civis.id;
              return (
                <tr key={civis.id} className="align-middle">
                  <td>{civis.nome}</td>

                  <td>{civis.cpf}</td>

                  <td>{formatDate(civis.dataEntrada)}</td>
                  <td>{formatTime(civis.horaEntrada)}</td>
                  <td className={`${civis.horaSaida === null || civis.horaSaida === '00:00:00' ? "bg-danger text-white fw-bold" : ""}`}>
                    {civis.horaSaida === null || civis.horaSaida === '00:00:00' ? 'OM' : formatTime(civis.horaSaida)}</td>
                  <td>{civis.destino}</td>

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
                            handleDeleteRegistro(id, civis.nome, civis.cpf)
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
                  <label htmlFor="nome-completo" className="form-label">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Insira o nome completo"
                    id="nome-completo"
                    required
                  />
                  <div className="valid-feedback">OK!</div>
                  <div className="invalid-feedback">Campo obrigatório.</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cpf" className="form-label">
                    CPF
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    value={registroCpf}
                    onChange={(e) => setRegistroCpf(cpfMask(e.target.value))}
                    placeholder="000.000.000-00"
                    name="cpf"
                    maxLength="14"
                    required
                  />
                  <div className="valid-feedback">OK!</div>
                  <div className="invalid-feedback">Campo obrigatório.</div>
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

                <div className="col-md-12">
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="destino"
                    placeholder="Insira o destino"
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
                <div className="col-md-6">
                  <label htmlFor="nome-completo" className="form-label">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Insira o nome completo"
                    id="nome-completo"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <div className="valid-feedback">OK!</div>
                  <div className="invalid-feedback">Campo obrigatório.</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cpf" className="form-label">
                    CPF
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    placeholder="Insira o CPF"
                    maxLength="14"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                  <div className="valid-feedback">OK!</div>
                  <div className="invalid-feedback">Campo obrigatório.</div>
                </div>

                <div className="col-md-4">
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

                <div className="col-md-12">
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
