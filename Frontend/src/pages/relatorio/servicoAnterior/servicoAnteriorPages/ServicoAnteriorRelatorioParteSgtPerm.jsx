import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoFooter from "../../../../components/impressao/impressaoFooter.jsx";
import estiloImpressao from "../../../../components/impressao/css/PrintPortrait.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import {
    EditarRegistros,
    Imprimir,
} from "../../../../components/botao";
import dbConfig from "../../../../components/util/dbConfig.jsx";
import { formatDate } from "../../../../components/util/formatDateTime.jsx";

export default function ServicoAnteriorRelatorioParteSgtPerm() {
    const selectedDate = localStorage.getItem('selectedDate');

    // Estado para armazenar os dados obtidos da API
    const [data, setData] = useState([]);
    // Estado para indicar se os dados estão sendo carregados
    const [loading, setLoading] = useState(true);

    // Função interna para buscar os dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            const response = await axios.get(`${dbConfig()}/servico_anterior_configuracao_servico/${selectedDate}`);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao buscar os serviços:", error);
        } finally {
            setLoading(false); // Indica que o carregamento terminou
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função fetchData para buscar dados da API e atualizar o estado 'data'
        fetchData();
    }, []);

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
                        <li className="breadcrumb-item">
                            <Link to="/relatorio_servico_anterior">Serviço Anterior</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/relatorio_servico_anterior/consulta_servico_anterior">Consulta ao dia {formatDate(selectedDate)}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Parte do Sgt Permanência
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Parte do Sgt Permanência do dia {formatDate(selectedDate)}</p>

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
        </>
    );
}
