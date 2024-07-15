import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../../components/impressao/css/PrintLandscape.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import { Imprimir } from "../../../../components/botao";
import dbConfig from "../../../../components/util/dbConfig";
import axios from "axios";
import { formatDate } from "../../../../components/util/formatDateTime";

export default function ServicoAnteriorRelatorioEscalaRonda() {
    const selectedDate = localStorage.getItem('selectedDate');

    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função interna para buscar os dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            const response = await axios.get(`${dbConfig()}/servico_anterior_configuracao_servico/${selectedDate}`);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao buscar os serviços:", error);
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função fetchData para buscar dados da API e atualizar o estado 'data'
        fetchData();
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
                            <Link to="/relatorio_servico_anterior/consulta_servico_anterior">Consulta ao dia {formatDate(selectedDate)}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Escala de ronda do comandante da guarda
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Escala de ronda do comandante da guarda do dia {formatDate(selectedDate)}</p>

            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="Escala de ronda do comandante da guarda" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">Horário</th>
                            <th scope="col">P1</th>
                            <th scope="col">P2</th>
                            <th scope="col">P3</th>
                            <th scope="col">Assinatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">21h</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">01h</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">03h</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>{militar.sdTerceiroHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                        {data.map((militar) => {
                            return (
                                <tr key={militar.id} className="align-middle">
                                    <td className="fw-bold">05h</td>
                                    <td>{militar.sdSegundoHorNome}</td>
                                    <td>{militar.sdPrimeiroHorNome}</td>
                                    <td>- - -</td>
                                    <td className="p-4"></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="container ms-0 p-0">
                    {data.map((alteracao) => {
                        return (

                            <p key={alteracao.id} className="text-justify">
                                <b>Alterações:</b> {alteracao.relatorio_ronda_observacao}
                            </p>

                        );
                    })}
                </div>

                <Imprimir impressao="paisagem" />
                <ImpressaoFooter />
            </div>

        </>
    );
}
