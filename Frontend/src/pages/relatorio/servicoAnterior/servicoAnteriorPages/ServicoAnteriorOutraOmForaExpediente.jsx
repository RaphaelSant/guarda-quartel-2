import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../../components/impressao/css/PrintLandscape.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import {
    Imprimir,
    NovoRegistro2,
} from "../../../../components/botao";
import clearForm from "../../../../components/util/clearForm";
import { formatDate, formatTime } from "../../../../components/util/formatDateTime";
import dbConfig from "../../../../components/util/dbConfig";

export default function ServicoAnteriorOutraOmForaExpediente() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/outra_om_durante_expediente
            const res = await fetch(`${dbConfig()}/servico_anterior_outra_om_fora_expediente`);

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
                            Militares de outras OM fora de expediente
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de militares outras organizações militares fora de expediente</p>
            <div
                className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}
            >
                <ImpressaoHeader titulo="Entrada e saída de militares outras organizações militares fora de expediente" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">PG</th>
                            <th scope="col">Nome Guerra</th>
                            <th scope="col">Idt Mil</th>
                            <th scope="col">OM</th>
                            <th scope="col">Data</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Origem/Destino</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dados) => {
                            let id = dados.id;
                            return (
                                <tr key={dados.id} className="align-middle">
                                    <td>{dados.pg}</td>

                                    <td>{dados.nomeGuerra}</td>

                                    <td>{dados.idtMil}</td>
                                    <td>{dados.om}</td>
                                    <td>{formatDate(dados.dataEntrada)}</td>
                                    <td>{formatTime(dados.horaEntrada)}</td>
                                    <td className={`${dados.horaSaida === null || dados.horaSaida === '00:00:00' ? "bg-danger text-white fw-bold" : ""}`}>
                                        {dados.horaSaida === null || dados.horaSaida === '00:00:00' ? 'OM' : formatTime(dados.horaSaida)}</td>
                                    <td>{dados.origem}</td>
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
