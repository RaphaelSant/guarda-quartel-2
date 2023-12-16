import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";
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

export default function CivisPe() {

  // Utilidades para o modal de EDIÇÃO / ATUALIZAÇÃO
  const [data, setData] = useState([]);

  const [id, setId] = useState([]);
  const [nome, setNome] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [dataEntrada, setDataEntrada] = useState([]);
  const [destino, setDestino] = useState([]);
  const [horaEntrada, setHoraEntrada] = useState([]);
  const [horaSaida, setHoraSaida] = useState([]);

  const buscarDadosPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/civis_pe/selectId/${id}`);
      const data = response.data;
      const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));


      // Verifica se há dados retornados antes de definir os estados
      if (data) {

        const dataEntrada = format(new Date(data.dataEntrada), 'yyyy-MM-dd');

        setId(data.id || "");
        setNome(data.nome || "");
        setCpf(data.cpf || "");
        setDataEntrada(dataEntrada || "");
        setDestino(data.destino || "");
        setHoraEntrada(data.horaEntrada || "");
        setHoraSaida(data.horaSaida || "");
        editModal.show();
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const atualizarDadosPorId = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/civis_pe/${id}`, {
        nome,
        cpf,
        dataEntrada,
        destino,
        horaEntrada,
        horaSaida,
      });

      console.log(response.data);
      alert(response.data.message); // Exibe o alerta
      clearForm();
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error;
    }
  };

  function formatDate(dateString) {
    const date = parseISO(dateString); // Converte a string para um objeto de data
    const formattedDate = format(date, "dd/MM/yyyy"); // Formata a data para dd/MM/yyyy
    return formattedDate;
  }
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    fetch("http://localhost:8081/civis_pe")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }), [];

  // Registro do civil pelo modal:
  const handleRegistrarSubmit = async (event) => {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const dataEntrada = document.getElementById('data-entrada').value;
    const destino = document.getElementById('destino').value;
    const horaEntrada = document.getElementById('hora-entrada').value;
    const nome = document.getElementById('nome-completo').value;
    const svRef = document.getElementById('data-svRef').value;

    const dados = {
      cpf,
      dataEntrada,
      destino,
      horaEntrada,
      nome,
      svRef,
    };

    try {
      const response = await fetch('http://localhost:8081/civis_pe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const responseData = await response.json();
      clearForm();
      alert(responseData.message); // Resposta do servidor após a inserção

      // Atualiza os dados na tela após a inserção
      fetchData();


    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const clearForm = () => {
    const inputs = document.querySelectorAll('input'); // Seleciona todos os inputs
    inputs.forEach((input) => {
      input.value = ''; // Limpa o valor de cada input
    });
  };
  
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8081/civis_pe");
      const fetchedData = await res.json();
      setData(fetchedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para deletar um registro pelo ID
  const deleteRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/civis_pe/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log(data); // Mensagem de sucesso ou erro após a exclusão
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  const deleteCivilConfirmacao = (id, nome, cpf) => {
    const shouldDelete = window.confirm(
      `Tem certeza de que deseja excluir este registro? Nome: ${nome} CPF: ${cpf}`
    ); // Exibe um diálogo de confirmação

    if (shouldDelete) {
      deleteRegistro(id); // Chama a função de exclusão se o usuário confirmar
    }
  };

  const teste = (id) => {

    buscarDadosPorId(id)

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
                Sv Ref
              </th>
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
                  <td className={`${civis.horaSaida === null ? "bg-danger text-white fw-bold" : ""}`}>
                    {civis.horaSaida ? formatTime(civis.horaSaida) : 'OM'}</td>
                  <td>{civis.destino}</td>

                  <td className="d-print-none">{civis.svRef ? formatDate(civis.svRef) : 'Valor padrão'}</td>

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
                            deleteCivilConfirmacao(id, civis.nome, civis.cpf)
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
                    placeholder="Insira o CPF"
                    maxLength="14"
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
                    data-format="00/00/0000"
                    className="form-control"
                    id="data-entrada"
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
                    required
                  />
                  <div className="valid-feedback">OK!</div>
                  <div className="invalid-feedback">Campo obrigatório.</div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="data-svRef" className="form-label">
                    Serviço de Referência
                  </label>
                  <input
                    type="date"
                    data-format="00/00/0000"
                    placeholder="dd/mm/yyyy"
                    className="form-control"
                    id="data-svRef"
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
              <h1 className="modal-title fs-5" id="editarRegistroLabel"><FontAwesomeIcon icon={faPenToSquare} className="me-2"/> Editar Registro</h1>
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
