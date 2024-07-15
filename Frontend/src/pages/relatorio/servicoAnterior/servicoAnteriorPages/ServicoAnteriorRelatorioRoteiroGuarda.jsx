import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ImpressaoHeader from "../../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../../components/impressao/css/PrintPortrait.module.css";
import "../../../../css/estiloTabela.css";

import Navbar from "../../../../components/navbar";
import { Imprimir } from "../../../../components/botao";
import dbConfig from "../../../../components/util/dbConfig";
import axios from "axios";
import { formatDate } from "../../../../components/util/formatDateTime";

export default function ServicoAnteriorRelatorioRoteiroGuarda() {
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
                            Roteiro da guarda
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Roteiro da guarda do dia {formatDate(selectedDate)}</p>
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
                                    <td>{militar.motoristaNomeGuerra}</td>
                                    <td>{militar.motoristaTpArmamento}</td>
                                    <td>{militar.motoristaNrArmamento}</td>
                                    <td>{militar.motoristaQtdMun}</td>
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

        </>
    );
}
