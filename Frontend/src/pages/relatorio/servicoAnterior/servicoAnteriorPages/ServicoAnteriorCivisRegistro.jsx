import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../../components/impressao/css/PrintPortrait.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import {
    Imprimir,
    NovoRegistro2,
} from "../../../../components/botao";
import { formatDate, formatTime } from "../../../../components/util/formatDateTime";
import dbConfig from "../../../../components/util/dbConfig";

export default function ServicoAnteriorCivisRegistro() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    useEffect(() => {
        // Executa um efeito após a renderização inicial do componente

        // Função interna para buscar os dados da API e atualizar o estado 'data'
        const fetchData = async () => {
            try {
                // Faz uma requisição para buscar dados de uma API em http://localhost:8081/servico_anterior_civis_veiculo
                const response = await fetch(`${dbConfig()}/servico_anterior_civis_pe`);
                // Converte a resposta para JSON
                const data = await response.json();
                // Define os dados recebidos no estado 'data' do componente
                setData(data);
            } catch (err) {
                // Captura e lida com erros, caso ocorram na requisição
                console.log(err);
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
                            Registro de Civil
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de civis</p>
            <div
                className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}
            >
                <ImpressaoHeader titulo="Entrada e saída de civis" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Identidade</th>
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

                                    <td>{civis.cpf}</td>

                                    <td>{formatDate(civis.dataEntrada)}</td>
                                    <td>{formatTime(civis.horaEntrada)}</td>
                                    <td className={`${civis.horaSaida === null || civis.horaSaida === '00:00:00' ? "bg-danger text-white fw-bold" : ""}`}>
                                        {civis.horaSaida === null || civis.horaSaida === '00:00:00' ? 'OM' : formatTime(civis.horaSaida)}</td>
                                    <td>{civis.destino}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Imprimir impressao="retrato" />
                <ImpressaoFooter />
            </div>

        </>
    );
}
