import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { capturaAno, capturaDia, capturaMes } from "../../../../components/util/capturaData.jsx";

import ImpressaoFooter from "../../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../../components/impressao/css/PrintPortrait.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import { Imprimir } from "../../../../components/botao";
import dbConfig from "../../../../components/util/dbConfig.jsx";

export default function ServicoAnteriorRelatorioParteSgtPerm() {
    let ontem = new Date().setHours(-1);
    ontem = new Date(ontem); // o comando setHours devolve a data em milisegundos
    const dataOntem = ontem.toLocaleDateString('pt-BR');

    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);
    const [dataMil, setDataMil] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data' - Parte Sgt Permanencia
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/relatorio_parte_sgt
            const res = await fetch(`${dbConfig()}/servico_anterior_relatorio_parte_sgt`);

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

    // Função para buscar dados da API e atualizar o estado 'dataMil' - Roteiro da guarda
    const fetchDataGuarnicao = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/relatorio_roteiro_guarda
            const res = await fetch(`${dbConfig()}/servico_anterior_relatorio_roteiro_guarda`);

            // Converte a resposta da requisição para o formato JSON
            const fetchedData = await res.json();

            // Atualiza o estado 'data' do componente com os dados obtidos da API
            setDataMil(fetchedData);
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
        fetchDataGuarnicao();
    }, []);

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
                            Parte do Sgt Permanência
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Parte do Sgt Permanência</p>

            <div className={`container border border-dark bg-white ${estiloImpressao.container_local}`}>
                <table className="table text-center table-bordered border-dark table-hover d-none d-print-block">
                    <thead>
                        <tr className="row">
                            <th scope="col" className="col-3">Subcomandante</th>
                            <th scope="col" className="fs-6 col-6">
                                Comando Militar da Amazônia – 12ª Região Militar <br />
                                17ª Brigada de Infantaria de Selva <br />
                                17º Pelotão de Comunicações de Selva <br />
                                <span className="fw-light" style={{ fontSize: 15 + 'px' }}>Parte do Sgt Permanência, referente ao serviço do dia {capturaDia() - 1} para o dia {capturaDia()} de {capturaMes()} de {capturaAno()}</span>
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
                                {dataMil.map((militares) => {
                                    return (
                                        <table className="table table-bordered border-dark table-hover table-local" key={militares.id}>
                                            <tbody>
                                                <tr>
                                                    <td><b>Cmt da Gda: </b>{militares.sgtNomeGuerra}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Cb da Gda: </b> {militares.cbNomeGuerra}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Plantões: </b> {militares.sdPrimeiroHorNome}; {militares.sdSegundoHorNome} e {militares.sdTerceiroHorNome}.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    );
                                })}
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
