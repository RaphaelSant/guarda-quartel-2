import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoFooter from "../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../components/impressao/css/PrintPortrait.module.css";
import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import {
    EditarRegistros,
    Imprimir,
} from "../../../components/botao";
import clearForm from "../../../components/util/clearForm";
import dbConfig from "../../../components/util/dbConfig.jsx";

export default function RelatorioParteSgtPerm() {
    // Estado para armazenar os dados obtidos da API
    const [data, setData] = useState([]);
    // Estado para indicar se os dados estão sendo carregados
    const [loading, setLoading] = useState(true);

    // Função assíncrona para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            const res = await fetch(`${dbConfig()}/configuracao_servico/servico_configurado`);
            const fetchedData = await res.json();
            setData(fetchedData); // Atualiza o estado com os dados obtidos
        } catch (err) {
            alert(err);
            console.log(err);
        } finally {
            setLoading(false); // Indica que o carregamento terminou
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função fetchData para buscar dados da API e atualizar o estado 'data'
        fetchData();
    }, []);

    // Utilidades para o modal de EDIÇÃO / ATUALIZAÇÃO
    const [id, setId] = useState([]);
    // Variaveis locais para alteração no banco de dados.
    const [paradaDiaria, setParadaDiaria] = useState("");
    const [recebimentoServico, setRecebimentoServico] = useState("");
    const [pessoalServico, setPessoalServico] = useState("");
    const [consFPontaAnterior, setConsFPontaAnterior] = useState("");
    const [consFPonta, setConsFPonta] = useState("");
    const [consPontaAnterior, setConsPontaAnterior] = useState("");
    const [consPonta, setConsPonta] = useState("");
    const [consTotal, setConsTotal] = useState("");
    const [consTotalAnterior, setConsTotalAnterior] = useState("");
    const [rancho, setRancho] = useState("");
    const [lixeiras, setLixeiras] = useState("");
    const [dependencias, setDependencias] = useState("");
    const [claviculario, setClaviculario] = useState("");
    const [bombaAgua, setBombaAgua] = useState("");
    const [revistaRecolher, setRevistaRecolher] = useState("");
    const [cameras, setCameras] = useState("");
    const [materialCarga, setMaterialCarga] = useState("");
    const [ocorrencias, setOcorrencias] = useState("");
    const [correspondencias, setCorrespondencias] = useState("");
    const [viaturas, setViaturas] = useState("");
    const [passagemServico, setPassagemServico] = useState("");
    const [armtMunicao, setArmtMunicao] = useState("");
    const [radios, setRadios] = useState("");

    // Busca de dados por Id para a edição
    const buscarDadosPorId = async () => {
        try {
            // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
            const response = await axios.get(`${dbConfig()}/configuracao_servico/servico_configurado`);
            const data = response.data[0];
            // Cria uma instância de um modal usando Bootstrap
            const editModal = new bootstrap.Modal(document.getElementById("editarRegistro"));
            
            //console.log(data)
            // Verifica se há dados retornados antes de definir os estados para evitar erros
            if (data) {
                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setParadaDiaria(data.paradaDiaria || "");
                setRecebimentoServico(data.recebimentoServico || "");
                setPessoalServico(data.pessoalServico || "");
                setConsFPontaAnterior(data.consFPontaAnterior || "");
                setConsFPonta(data.consFPonta || "");
                setConsPontaAnterior(data.consPontaAnterior || "");
                setConsPonta(data.consPonta || "");
                setConsTotal(data.consTotal || "");
                setConsTotalAnterior(data.consTotalAnterior || "");
                setRancho(data.rancho || "");
                setLixeiras(data.lixeiras || "");
                setDependencias(data.dependencias || "");
                setClaviculario(data.claviculario || "");
                setBombaAgua(data.bombaAgua || "");
                setRevistaRecolher(data.revistaRecolher || "");
                setCameras(data.cameras || "");
                setMaterialCarga(data.materialCarga || "");
                setOcorrencias(data.ocorrencias || "");
                setCorrespondencias(data.correspondencias || "");
                setViaturas(data.viaturas || "");
                setPassagemServico(data.passagemServico || "");
                setArmtMunicao(data.armtMunicao || "");
                setRadios(data.radios || "");

                // Mostra o modal de edição após definir os estados com os dados
                editModal.show();
            }

            console.log(viaturas);

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
            const response = await axios.put(`${dbConfig()}/parte_sgt_permanencia`, {
                // Envia os dados a serem atualizados no corpo da requisição
                paradaDiaria,
                recebimentoServico,
                pessoalServico,
                consPonta,
                consPontaAnterior,
                consFPonta,
                consFPontaAnterior,
                consTotal,
                consTotalAnterior,
                rancho,
                lixeiras,
                armtMunicao,
                dependencias,
                claviculario,
                bombaAgua,
                revistaRecolher,
                radios,
                cameras,
                materialCarga,
                ocorrencias,
                correspondencias,
                viaturas,
                passagemServico
            });

            // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
            alert(response.data.message);
            

            // Limpa o formulário após a atualização dos dados
            clearForm();

            await fetchData();

            // Retorna os dados da resposta da requisição
            return response.data;
        } catch (error) {
            console.log(error);
            const mensagem = error.response.data.message;
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(mensagem);

            // Lança o erro novamente para ser tratado por quem chamou essa função
            // throw error;
        }
    };

    // Se os dados ainda estão sendo carregados, mostra uma mensagem de carregamento
    if (loading) {
        return <div>Carregando...</div>;
    }

    // Definindo datas e formatando-as
    const dataAtual = new Date(data[0].servico_ref);
    const dataPosterior = new Date(data[0].servico_ref);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dataPosterior.setDate(dataPosterior.getDate() + 1); // Obtém a data do dia Posterior

    const dataPorExtenso = new Intl.DateTimeFormat('pt-BR', options).format(dataAtual);
    const dataPosteriorPorExtenso = new Intl.DateTimeFormat('pt-BR', options).format(dataPosterior);


    // Quando os dados estiverem disponíveis, faz o log
    //console.log(data[0].servico_ref);


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
                            Parte do Sgt Permanência
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Parte do Sgt Permanência</p>
            <div className="text-center mb-4 d-print-none">
                <EditarRegistros click={() => buscarDadosPorId(1)} />

            </div>

            <div className={`container border border-dark bg-white ${estiloImpressao.container_local}`}>
                <table className="table text-center table-bordered border-dark table-hover d-none d-print-block">
                    <thead>
                        <tr className="row">
                            <th scope="col" className="col-3">Subcomandante</th>
                            <th scope="col" className="fs-6 col-6">
                                Comando Militar da Amazônia – 12ª Região Militar <br />
                                17ª Brigada de Infantaria de Selva <br />
                                17º Pelotão de Comunicações de Selva <br />
                                <span className="fw-light" style={{ fontSize: 15 + 'px' }}>Parte do Sgt Permanência, referente ao serviço do dia {dataPorExtenso} para o dia {dataPosteriorPorExtenso}</span>
                            </th>
                            <th scope="col" className="col-3">Enc Material</th>
                        </tr>
                    </thead>
                </table>
                <div>
                    {data.map((parteSgt) => {
                        return (
                            <div key={parteSgt.id}>
                                <p className="my-1"><b>01 – Parada Diária:</b> {parteSgt.paradaDiaria}</p>
                                <p className="my-1"><b>02 – Recebimento do Serviço:</b> {parteSgt.recebimentoServico}</p>
                                <p className="my-1"><b>03 – Pessoal de Serviço:</b> {parteSgt.pessoalServico}</p>
                                <table className="table table-bordered border-dark table-hover table-local" key={parteSgt.id}>
                                    <tbody>
                                        <tr>
                                            <td><b>Cmt da Gda: </b>{parteSgt.sgtNomeGuerra}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Cb da Gda: </b> {parteSgt.cbNomeGuerra}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Plantões: </b> {parteSgt.sdPrimeiroHorNome}; {parteSgt.sdSegundoHorNome} e {parteSgt.sdTerceiroHorNome}.</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="my-1"><b>04 - Energia Elétrica:</b></p>
                                <table className="table text-center table-bordered border-dark table-hover table-local">
                                    <thead>
                                        <tr className="align-middle">
                                            <th>Leitura</th>
                                            <th>Atual</th>
                                            <th>Anterior</th>
                                            <th>Consumo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="align-middle">
                                            <td>Consumo de ponta (4)</td>
                                            <td>{parteSgt.consPonta}</td>
                                            <td>{parteSgt.consPontaAnterior}</td>
                                            <td>{Number(parteSgt.consPonta) - Number(parteSgt.consPontaAnterior)}</td>
                                        </tr>
                                        <tr>
                                            <td>Consumo de fora de ponta (8)</td>
                                            <td>{parteSgt.consFPonta}</td>
                                            <td>{parteSgt.consFPontaAnterior}</td>
                                            <td>{Number(parteSgt.consFPonta) - Number(parteSgt.consFPontaAnterior)}</td>
                                        </tr>
                                        <tr>
                                            <td>Consumo total (3)</td>
                                            <td>{parteSgt.consTotal}</td>
                                            <td>{parteSgt.consTotalAnterior}</td>
                                            <td>{Number(parteSgt.consTotal) - Number(parteSgt.consTotalAnterior)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="my-1"><b>05 – Rancho: </b>{parteSgt.rancho}</p>
                                <p className="my-1"><b>06 – Lixeiras: </b>{parteSgt.lixeiras}</p>
                                <p className="my-1"><b>07 - Armamento e munição: </b>{parteSgt.armtMunicao}</p>
                                <p className="my-1"><b>08 – Dependências: </b>{parteSgt.dependencias}</p>
                                <p className="my-1"><b>09 – Claviculário: </b>{parteSgt.claviculario}</p>
                                <p className="my-1"><b>10 – Bomba d'água: </b>{parteSgt.bombaAgua}</p>
                                <p className="my-1"><b>11 – Revista do recolher: </b>{parteSgt.revistaRecolher}</p>
                                <p className="my-1"><b>12 – Rádios: </b>{parteSgt.radios}</p>
                                <p className="my-1"><b>13 – Câmeras: </b>{parteSgt.cameras}</p>
                                <p className="my-1"><b>14 – Material Carga: </b>{parteSgt.materialCarga}</p>
                                <p className="my-1"><b>15 – Ocorrências: </b>{parteSgt.ocorrencias}</p>
                                <p className="my-1"><b>16 – Correspondências: </b>{parteSgt.correspondencias}</p>
                                <p className="my-1"><b>17 – Viaturas: </b>{parteSgt.viaturas}</p>
                                <p className="my-1 mb-5"><b>18 – Passagem do serviço: </b>{parteSgt.passagemServico}</p>
                            </div>
                            //<p key={alteracao.id}><b>Alterações:</b> {alteracao.alteracoes}</p>
                        );
                    })}
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Imprimir />
                    <ImpressaoFooter />
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
                                    <label htmlFor="parada-diaria" className="form-label">
                                        01 - Parada Diária
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="01 - Parada Diária"
                                        id="parada-diaria"
                                        value={paradaDiaria}
                                        onChange={(e) => setParadaDiaria(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="recebimento-servico" className="form-label">
                                        02 - Recebimento do Serviço
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="02 - Recebimento do Serviço"
                                        id="recebimento-servico"
                                        value={recebimentoServico}
                                        onChange={(e) => setRecebimentoServico(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pessoal-servico" className="form-label">
                                        03 – Pessoal de Serviço
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="03 – Pessoal de Serviço"
                                        id="pessoal-servico"
                                        value={pessoalServico}
                                        onChange={(e) => setPessoalServico(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <h5>04 - Energia Elétrica: Consumo</h5>
                                <div className="col-md-6">
                                    <label htmlFor="consumo-ponta-atual" className="form-label">
                                        Ponta (4) - Atual
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Consumo de ponta (4) - Atual"
                                        id="consumo-ponta-atual"
                                        value={consPonta}
                                        onChange={(e) => setConsPonta(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="consumo-ponta-anterior" className="form-label">
                                        Ponta (4) - Anterior
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Consumo de ponta (4) - Anterior"
                                        id="consumo-ponta-anterior"
                                        value={consPontaAnterior}
                                        onChange={(e) => setConsPontaAnterior(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="consumo-fora-ponta-atual" className="form-label">
                                        F. ponta (8) - Atual
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Consumo de fora de ponta (8) - Atual"
                                        id="consumo-fora-ponta-atual"
                                        value={consFPonta}
                                        onChange={(e) => setConsFPonta(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="consumo-fora-ponta-anterior" className="form-label">
                                        F. ponta (8) - Anterior
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Consumo de fora de ponta (8) - anterior"
                                        id="consumo-fora-ponta-anterior"
                                        value={consFPontaAnterior}
                                        onChange={(e) => setConsFPontaAnterior(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="consumo-total" className="form-label">
                                        Total (3) - Atual
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Consumo de fora de ponta (8) - anterior"
                                        id="consumo-total"
                                        value={consTotal}
                                        onChange={(e) => setConsTotal(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="consumo-total-anterior" className="form-label">
                                        Total (3) - Anterior
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Consumo de fora de ponta (8) - anterior"
                                        id="consumo-total-anterior"
                                        value={consTotalAnterior}
                                        onChange={(e) => setConsTotalAnterior(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="rancho" className="form-label">
                                        05 – Rancho
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="05 – Rancho"
                                        id="rancho"
                                        value={rancho}
                                        onChange={(e) => setRancho(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lixeiras" className="form-label">
                                        06 – Lixeiras
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="06 – Lixeiras"
                                        id="lixeiras"
                                        value={lixeiras}
                                        onChange={(e) => setLixeiras(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="armto-municao" className="form-label">
                                        07 - Armamento e munição
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="07 - Armamento e munição"
                                        id="armto-municao"
                                        value={armtMunicao}
                                        onChange={(e) => setArmtMunicao(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="dependencias" className="form-label">
                                        08 – Dependências
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="08 – Dependências"
                                        id="dependencias"
                                        value={dependencias}
                                        onChange={(e) => setDependencias(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="claviculario" className="form-label">
                                        09 – Claviculário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="09 – Claviculário"
                                        id="claviculario"
                                        value={claviculario}
                                        onChange={(e) => setClaviculario(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="bombaAgua" className="form-label">
                                        10 – Bomba d'água:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="10 – Bomba d'água:"
                                        id="bombaAgua"
                                        value={bombaAgua}
                                        onChange={(e) => setBombaAgua(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="revistaRecolher" className="form-label">
                                        11 – Revista do recolher
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="11 – Revista do recolher"
                                        id="revistaRecolher"
                                        value={revistaRecolher}
                                        onChange={(e) => setRevistaRecolher(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="radios" className="form-label">
                                        12 – Rádios
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="12 – Rádios"
                                        id="radios"
                                        value={radios}
                                        onChange={(e) => setRadios(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cameras" className="form-label">
                                        13 – Câmeras
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="13 – Câmeras"
                                        id="cameras"
                                        value={cameras}
                                        onChange={(e) => setCameras(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="material-carga" className="form-label">
                                        14 – Material Carga
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="14 – Material Carga"
                                        id="material-carga"
                                        value={materialCarga}
                                        onChange={(e) => setMaterialCarga(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="ocorrencias" className="form-label">
                                        16 – Ocorrências
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="16 – Ocorrências"
                                        id="ocorrencias"
                                        value={ocorrencias}
                                        onChange={(e) => setOcorrencias(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="correspondencias" className="form-label">
                                        17 – Correspondências
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="17 – Correspondências"
                                        id="correspondencias"
                                        value={correspondencias}
                                        onChange={(e) => setCorrespondencias(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="viaturas" className="form-label">
                                        18 – Viaturas
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="18 – Viaturas"
                                        id="viaturas"
                                        value={viaturas}
                                        onChange={(e) => setViaturas(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="passagem-servico" className="form-label">
                                        19 – Passagem do serviço
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="19 – Passagem do serviço"
                                        id="passagem-servico"
                                        value={passagemServico}
                                        onChange={(e) => setPassagemServico(e.target.value)}
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
