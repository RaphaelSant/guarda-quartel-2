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

export default function ServicoAnteriorOutraOmViatura() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/pelotao_viatura
            const res = await fetch(`${dbConfig()}/servico_anterior_outra_om_viatura`);

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
                            Viaturas de outras organizações militares
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de viaturas de outras organizações militares</p>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="Entrada e saída de viaturas de outras organizações militares" />

                <table className="table text-center table-bordered border-dark table-hover">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col" rowSpan={'2'}>Vtr - OM</th>
                            <th scope="col" colSpan={'2'}>Odômetro</th>
                            <th scope="col" rowSpan={'2'}>Data</th>
                            <th scope="col" colSpan={'2'}>Horário</th>
                            <th scope="col" rowSpan={'2'}>Motorista</th>
                            <th scope="col" rowSpan={'2'}>Chefe de Vtr / Acompanhante</th>
                            <th scope="col" rowSpan={'2'}>Destino</th>
                        </tr>
                        <tr className="align-middle">
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((dados) => {
                            let id = dados.id;
                            return (
                                <tr key={dados.id} className="align-middle">
                                    <td>{dados.vtr}</td>
                                    <td>{dados.odmEntrada === null || dados.odmEntrada === '' ? '- - -' : dados.odmEntrada}</td>
                                    <td>{dados.odmSaida === null || dados.odmSaida === '' ? '- - -' : dados.odmSaida}</td>
                                    <td>{formatDate(dados.dataRegistro)}</td>
                                    <td>{dados.horaEntrada === null || dados.horaEntrada === '00:00:00' ? '- - -' : formatTime(dados.horaEntrada)}</td>
                                    <td>{dados.horaSaida === null || dados.horaSaida === '00:00:00' ? '- - -' : formatTime(dados.horaSaida)}</td>
                                    <td>{dados.motorista}</td>
                                    <td>{dados.chefeVtr}</td>
                                    <td>{dados.destino}</td>
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
