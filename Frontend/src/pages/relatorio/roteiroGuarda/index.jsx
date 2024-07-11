import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios, { formToJSON } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../components/impressao/css/PrintPortrait.module.css";
import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import {
    EditarRegistros,
    Imprimir,
} from "../../../components/botao";
import clearForm from "../../../components/util/clearForm";
import dbConfig from "../../../components/util/dbConfig";

export default function RelatorioRoteiroGuarda() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/relatorio_roteiro_guarda
            const resRelatorio = await fetch(`${dbConfig()}/configuracao_servico/servico_configurado`);

            // Converte a resposta da requisição para o formato JSON
            const fetchedData = await resRelatorio.json();

            // Atualiza o estado 'data' do componente com os dados obtidos da API
            setData(fetchedData);

            //console.log(configId);
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
    const [sgtNomeGuerra, setSgtNomeGuerra] = useState([]);
    const [sgtTpArmamento, setSgtTpArmamento] = useState([]);
    const [sgtNrArmamento, setSgtNrArmamento] = useState([]);
    const [sgtQtdMun, setSgtQtdMun] = useState([]);
    const [cbNomeGuerra, setCbNomeGuerra] = useState([]);
    const [cbTpArmamento, setCbTpArmamento] = useState([]);
    const [cbNrArmamento, setCbNrArmamento] = useState([]);
    const [cbQtdMun, setCbQtdMun] = useState([]);
    const [motoristaNomeGuerra, setMotoristaNomeGuerra] = useState([]);
    const [motoristaTpArmamento, setMotoristaTpArmamento] = useState([]);
    const [motoristaNrArmamento, setMotoristaNrArmamento] = useState([]);
    const [motoristaQtdMun, setMotoristaQtdMun] = useState([]);
    const [sdPrimeiroHorNome, setSdPrimeiroHorNome] = useState([]);
    const [sdSegundoHorNome, setSdSegundoHorNome] = useState([]);
    const [sdTerceiroHorNome, setSdTerceiroHorNome] = useState([]);

    // Busca de dados por Id para a edição
    const buscarDadosPorId = async () => {
        try {
            // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
            const response = await axios.get(`${dbConfig()}/configuracao_servico/servico_configurado`);
            const data = response.data[0];
            console.log(data);
            // Cria uma instância de um modal usando Bootstrap
            const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));

            // Verifica se há dados retornados antes de definir os estados para evitar erros
            if (data) {

                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setSgtNomeGuerra(data.sgtNomeGuerra || "");
                setSgtTpArmamento(data.sgtTpArmamento || "");
                setSgtNrArmamento(data.sgtNrArmamento || "");
                setSgtQtdMun(data.sgtQtdMun || "");
                setCbNomeGuerra(data.cbNomeGuerra || "");
                setCbTpArmamento(data.cbTpArmamento || "");
                setCbNrArmamento(data.cbNrArmamento || "");
                setCbQtdMun(data.cbQtdMun || "");
                setMotoristaNomeGuerra(data.motoristaNomeGuerra || "");
                setMotoristaTpArmamento(data.motoristaTpArmamento || "");
                setMotoristaNrArmamento(data.motoristaNrArmamento || "");
                setMotoristaQtdMun(data.motoristaQtdMun || "");
                setSdPrimeiroHorNome(data.sdPrimeiroHorNome || "");
                setSdSegundoHorNome(data.sdSegundoHorNome || "");
                setSdTerceiroHorNome(data.sdTerceiroHorNome || "");

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
    const atualizarDadosPorId = async () => {
        try {
            // Envia uma requisição PUT para atualizar os dados do registro com o ID fornecido
            const response = await axios.put(`${dbConfig()}/roteiro_guarda`, {
                // Envia os dados a serem atualizados no corpo da requisição
                sgtTpArmamento,
                sgtNrArmamento,
                sgtQtdMun,
                cbTpArmamento,
                cbNrArmamento,
                cbQtdMun,
                motoristaTpArmamento: motoristaTpArmamento && motoristaTpArmamento.trim() !== "" ? motoristaTpArmamento : null,
                motoristaNrArmamento: motoristaNrArmamento && motoristaNrArmamento.trim() !== "" ? motoristaNrArmamento : null,
                motoristaQtdMun: motoristaQtdMun && motoristaQtdMun.trim() !== "" ? motoristaQtdMun : null,
            });

            // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
            alert(response.data.message);

            // Limpa o formulário após a atualização dos dados
            clearForm();

            // Faz a busca dos dados atualizados
            await fetchData();

            // Retorna os dados da resposta da requisição
            return response.data;
        } catch (error) {
            const mensagem = error.response.data.message;
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(mensagem);
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
                            Roteiro da guarda
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Roteiro da guarda</p>
            <div className="text-center mb-4 d-print-none">
                <EditarRegistros click={() => buscarDadosPorId()} />

            </div>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="Roteiro da guarda" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">Grad</th>
                            <th scope="col">Nome de Guerra</th>
                            <th scope="col">Tipo Armto</th>
                            <th scope="col">Nr Armto</th>
                            <th scope="col">Qtde Mun</th>
                            <th scope="col">Função</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">Sargento</td>
                                    <td>{militar.sgtNomeGuerra}</td>
                                    <td>{militar.sgtTpArmamento}</td>
                                    <td>{militar.sgtNrArmamento}</td>
                                    <td>{militar.sgtQtdMun}</td>
                                    <td className="fw-bold">Cmt Gda</td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">Cabo</td>
                                    <td>{militar.cbNomeGuerra}</td>
                                    <td>{militar.cbTpArmamento}</td>
                                    <td>{militar.cbNrArmamento}</td>
                                    <td>{militar.cbQtdMun}</td>
                                    <td className="fw-bold">Cb Gda</td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">Soldado</td>
                                    <td>{militar.motoristaNomeGuerra === null ? '- - -' : militar.motoristaNomeGuerra}</td>
                                    <td>{militar.motoristaTpArmamento === null ? '- - -' : militar.motoristaTpArmamento}</td>
                                    <td>{militar.motoristaNrArmamento === null ? '- - -' : militar.motoristaNrArmamento}</td>
                                    <td>{militar.motoristaQtdMun === null ? '- - -' : militar.motoristaQtdMun}</td>
                                    <td className="fw-bold">Mot Dia</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <p>
                    <b>ROTEIRO DE RODÍZIO DA GUARDA</b>
                </p>

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">Horários</th>
                            <th scope="col">P1</th>
                            <th scope="col">P2</th>
                            <th scope="col">P3</th>
                        </tr>
                    </thead>

                    {data.map((militar) => {
                        return (
                            <tbody key={militar.id}>
                                <tr className="align-middle">
                                    <td className="fw-bold">08:00 às 10:00</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">10:00 às 12:00</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">12:00 às 14:00</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">14:00 às 16:00</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">16:00 às 18:00</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">18:00 às 20:00</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">20:00 às 22:00</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">22:00 às 00:00</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">00:00 às 02:00</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">02:00 às 04:00</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">04:00 às 06:00</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">06:00 às 08:00</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>- - -</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>

                <Imprimir impressao="retrato" />
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
                            <form className="row g-3 was-validated">
                                <h4>Sargento Permanência</h4>
                                <div className="col-md-3">
                                    <label htmlFor="sgt-nome-guerra" className="form-label">
                                        Nome de guerra
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome de guerra"
                                        id="sgt-nome-guerra"
                                        maxLength="100"
                                        required
                                        disabled
                                        value={sgtNomeGuerra}
                                        onChange={(e) => setSgtNomeGuerra(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="sgt-tipo-armamento" className="form-label">
                                        Tipo de armamento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tipo de armamento"
                                        id="sgt-tipo-armamento"
                                        maxLength="50"
                                        required
                                        value={sgtTpArmamento}
                                        onChange={(e) => setSgtTpArmamento(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="sgt-numero-armamento" className="form-label">
                                        N° do armamento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="N° do armamento"
                                        id="sgt-numero-armamento"
                                        maxLength="50"
                                        required
                                        value={sgtNrArmamento}
                                        onChange={(e) => setSgtNrArmamento(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="sgt-qtd-mun" className="form-label">
                                        Quantidade de munição
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Qtd de munição"
                                        id="sgt-qtd-mun"
                                        maxLength="10"
                                        required
                                        value={sgtQtdMun}
                                        onChange={(e) => setSgtQtdMun(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <hr />
                                <h4>Cabo da Guarda</h4>
                                <div className="col-md-3">
                                    <label htmlFor="cb-nome-guerra" className="form-label">
                                        Nome de guerra
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome de guerra"
                                        id="cb-nome-guerra"
                                        maxLength="100"
                                        required
                                        disabled
                                        value={cbNomeGuerra}
                                        onChange={(e) => setCbNomeGuerra(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cb-tipo-armamento" className="form-label">
                                        Tipo de armamento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tipo de armamento"
                                        id="cb-tipo-armamento"
                                        maxLength="50"
                                        required
                                        value={cbTpArmamento}
                                        onChange={(e) => setCbTpArmamento(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cb-numero-armamento" className="form-label">
                                        N° do armamento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="N° do armamento"
                                        id="cb-numero-armamento"
                                        maxLength="50"
                                        required
                                        value={cbNrArmamento}
                                        onChange={(e) => setCbNrArmamento(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cb-qtd-mun" className="form-label">
                                        Quantidade de munição
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Qtd de munição"
                                        id="cb-qtd-mun"
                                        maxLength="10"
                                        required
                                        value={cbQtdMun}
                                        onChange={(e) => setCbQtdMun(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <hr />
                                <h4>Soldado (Motorista de dia)</h4>
                                <div className="col-md-3">
                                    <label htmlFor="sd-nome-guerra" className="form-label">
                                        Nome de guerra
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome de guerra"
                                        id="sd-nome-guerra"
                                        maxLength="100"
                                        required
                                        disabled
                                        value={motoristaNomeGuerra}
                                        onChange={(e) => setMotoristaNomeGuerra(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo opcional.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="sd-tipo-armamento" className="form-label">
                                        Tipo de armamento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tipo de armamento"
                                        id="sd-tipo-armamento"
                                        maxLength="50"
                                        required
                                        value={motoristaTpArmamento}
                                        onChange={(e) => setMotoristaTpArmamento(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo opcional.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="sd-numero-armamento" className="form-label">
                                        N° do armamento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="N° do armamento"
                                        id="sd-numero-armamento"
                                        maxLength="50"
                                        required
                                        value={motoristaNrArmamento}
                                        onChange={(e) => setMotoristaNrArmamento(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo opcional.</div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="sd-qtd-mun" className="form-label">
                                        Quantidade de munição
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Qtd de munição"
                                        id="sd-qtd-mun"
                                        maxLength="10"
                                        required
                                        value={motoristaQtdMun}
                                        onChange={(e) => setMotoristaQtdMun(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo opcional.</div>
                                </div>

                                <hr />
                                <h4>Soldados (Plantões)</h4>
                                <div className="col-md-4">
                                    <label htmlFor="sd-primeiro-horario" className="form-label">
                                        1° Horário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="1° Horário"
                                        id="sd-primeiro-horario"
                                        maxLength="100"
                                        required
                                        disabled
                                        value={sdPrimeiroHorNome}
                                        onChange={(e) => setSdPrimeiroHorNome(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="sd-segundo-horario" className="form-label">
                                        2° Horário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="2° Horário"
                                        id="sd-segundo-horario"
                                        maxLength="100"
                                        required
                                        disabled
                                        value={sdSegundoHorNome}
                                        onChange={(e) => setSdSegundoHorNome(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="sd-terceiro-horario" className="form-label">
                                        3° Horário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="3° Horário"
                                        id="sd-terceiro-horario"
                                        maxLength="100"
                                        required
                                        disabled
                                        value={sdTerceiroHorNome}
                                        onChange={(e) => setSdTerceiroHorNome(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={(e) => atualizarDadosPorId()} className="btn btn-md btn-success">Atualizar Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
