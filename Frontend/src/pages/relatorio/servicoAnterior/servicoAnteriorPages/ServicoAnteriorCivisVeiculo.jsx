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
import { formatDate, formatTime } from "../../../../components/util/formatDateTime";
import dbConfig from "../../../../components/util/dbConfig";
import axios from "axios";

export default function ServicoAnteriorCivisVeiculo() {
    const selectedDate = localStorage.getItem('selectedDate');

    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    useEffect(() => {
        // Executa um efeito após a renderização inicial do componente

        // Função interna para buscar os dados da API e atualizar o estado 'data'
        const fetchData = async () => {

            try {
                const response = await axios.get(`${dbConfig()}/servico_anterior_veiculo_civis/${selectedDate}`);
                setData(response.data);
            } catch (error) {
                console.error("Erro ao buscar os serviços:", error);
            }
        };

        // Chama a função para buscar dados apenas uma vez após a montagem do componente
        fetchData();

    }, []); // <- Passando um array vazio, o useEffect executa apenas uma vez após a montagem do componente

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
                            Registro de veículos civis
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de veículos civis do dia {formatDate(selectedDate)}</p>
            <div
                className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}
            >
                <ImpressaoHeader titulo="Entrada e saída de veículos civis" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">CNH</th>
                            <th scope="col">Placa</th>
                            <th scope="col">Data</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Destino</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((civis) => {
                            let id = civis.id;
                            return (
                                <tr key={civis.id} className="align-middle">
                                    <td>{civis.nome}</td>

                                    <td>{civis.cnh}</td>

                                    <td>{civis.placa}</td>
                                    <td>{formatDate(civis.dataEntrada)}</td>
                                    <td>
                                        {civis.horaEntrada === null || civis.horaEntrada === '00:00:00' ? '- - -' : formatTime(civis.horaEntrada)}
                                    </td>
                                    <td>
                                        {civis.horaSaida === null || civis.horaSaida === '00:00:00' ? '- - -' : formatTime(civis.horaSaida)}
                                    </td>
                                    <td>{civis.destino}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Imprimir impressao="paisagem" />
                <ImpressaoFooter />
            </div>

        </>
    );
}
