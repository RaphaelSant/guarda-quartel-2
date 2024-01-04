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

export default function ServicoAnteriorRelatorioEscalaRonda() {
    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API em http://localhost:8081/pelotao_viatura
            const res = await fetch(`${dbConfig()}/servico_anterior_relatorio_roteiro_guarda`);

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
                            Escala de ronda do comandante da guarda
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Escala de ronda do comandante da guarda</p>

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
