import React, { useEffect, useState } from "react";
import '../../../css/geral.css';
import Navbar from "../../../components/navbar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import dbConfig from "../../../components/util/dbConfig";
import ministerioLogo from "../../../assets/img/ministerio-logo.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { formatDate, formatTime } from "../../../components/util/formatDateTime";
import estiloImpressao from "../../../components/impressao/css/PrintPortrait.module.css";
import { Imprimir } from "../../../components/botao";
import ImpressaoFooter from "../../../components/impressao/impressaoFooter";

export default function VizualizarFichaViatura() {
    // Estado para armazenar o ID e os dados da viatura
    const [id, setId] = useState(null);
    const [dados, setDados] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Novo estado para controlar o carregamento

    const imprime = () => {
        return console.log(dados);
    }

    // Função para buscar os dados
    const buscarDadosPorId = async (id, setDados) => {
        try {
            // Fazendo a requisição ao servidor para buscar os dados pelo ID
            const response = await axios.get(`${dbConfig()}/ficha_viatura/selectId/${id}`);
            const data = response.data;
            console.log(data); // Para verificar o que está sendo retornado

            if (data) {
                // Se os dados foram encontrados, armazene-os no estado
                setDados(data);
            } else {
                toast.error("Nenhum dado encontrado para o ID fornecido.");
            }
        } catch (error) {
            // Caso haja erro na requisição, exibe uma mensagem de erro
            toast.error(`Erro ao buscar dados: ${error.message}`);
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false); // Defina como false após o carregamento
        }
    };

    useEffect(() => {
        // Recupera o id armazenado no localStorage
        const storedId = localStorage.getItem('fichaId');
        console.log(storedId); // Verifique se o id foi recuperado corretamente

        if (storedId) {
            setId(storedId); // Se o id existir no localStorage, atualiza o estado
        } else {
            toast.error("ID não encontrado no localStorage.");
        }
    }, []);

    useEffect(() => {
        // Quando o id for encontrado, chama a função para buscar os dados
        if (id) {
            setIsLoading(true); // Define como true para mostrar o carregamento
            buscarDadosPorId(id, setDados);
        }
    }, [id]); // Este useEffect é chamado quando o 'id' muda

    // Verifique se os dados estão carregados antes de renderizar
    if (isLoading) {
        return (
            <div class="spinner-grow text-primary d-flex align-items-center justify-content-center" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        ); // Exiba uma mensagem ou componente de carregamento
    }

    return (
        <>
            <Navbar />
            <div className="d-flex d-print-none align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Página Inicial</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/ficha_viaturas">Ficha de Viatura</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/ficha_viaturas/consultar_ficha">Consultar de Viatura</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Vizualizar Ficha de Viatura
                        </li>
                    </ol>
                </nav>
            </div>

            <div className={`container mt-2 d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <h1 className="text-center d-print-none">Vizualizar Ficha de Viatura</h1>
                <hr className="d-print-none" />

                <div className="d-print-blockborder border p-2 border-dark bg-white mb-4">
                    <div className="text-center">
                        <img
                            src={ministerioLogo}
                            width={"80px"}
                            alt="ministerio logo"
                        />
                    </div>
                    <p className="text-center">
                        <b>
                            Ministério da Defesa
                            <br />
                            Exército Brasileiro
                            <br />
                            17ª Brigada de Infantaria de Selva
                            <br />
                            17° Pelotão de Comunicações de Selva
                        </b>
                    </p>

                    {/* Tabela com dados da viatura */}
                    <Table className="table table-bordered border-dark table-hover">
                        <tbody>
                            <tr>
                                <td><b>Velocidade Max:</b> {dados?.velMax}</td>
                                <td><b>Viatura:</b> {dados.viatura}</td>
                                <td><b>EB:</b> {dados.eb}</td>
                            </tr>
                            <tr>
                                <td><b>Motorista:</b> {dados.motNome}</td>
                                <td colSpan={2}><b>Apresentar-se:</b> {dados.apresentarse}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>Natureza Sv:</b> {dados.naturezaSv}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>Itinerário:</b> {dados.itinerario}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p>Viatura está em condições e autorizada de ser utilizada no serviço e itinerário acima.</p>

                    <div className="d-flex align-items-center justify-content-center">
                        <div className="border-bottom border-dark w-50 mt-5" style={{ height: 1 + 'px' }}></div>
                    </div>
                    <p className="text-center">Ass: S4 do 17º Pel Com Sl</p>

                    <br />
                    <br />
                    <p className="text-center">Liberei a viatura as ______h do dia ____/____/______, com a seguinte marcação do odômetro:__________________.</p>
                    <br />
                    <br />
                    <div className="assinatura"></div>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="border-bottom border-dark w-50 mt-2" style={{ height: 1 + 'px' }}></div>
                    </div>
                    <p className="text-center">Pessoa que utilizou a viatura</p>

                    <Table className="table table-bordered border-dark table-hover">
                        <tbody>
                            <tr>
                                <td></td>
                                <td className="text-center"><b>Horas</b></td>
                                <td className="text-center"><b>Odômetro</b></td>
                                <td className="text-center"><b>Combústivel</b></td>
                            </tr>
                            <tr>
                                <td className="text-center"><b>Saída</b></td>
                                <td className="text-center">{formatTime(dados.horaSaida)}</td>
                                <td className="text-center">{dados.odmSaida}</td>
                                <td className="text-center">{dados.combustivel}</td>
                            </tr>
                            <tr>
                                <td className="text-center"><b>Regresso</b></td>
                                <td className="text-center">{dados?.horaRegresso}</td>
                                <td className="text-center">{dados?.odometroRegresso}</td>
                                <td className="text-center">{dados?.combustivelRegresso}</td>
                            </tr>
                            <tr>
                                <td className="text-center"><b>Diferença</b></td>
                                <td className="text-center">{dados?.diferencaHora}</td>
                                <td className="text-center">{dados?.diferencaOdometro}</td>
                                <td className="text-center">{dados?.diferencaCombustivel}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <div className="my-5" style={{borderTop: 'dashed 2px'}}></div>

                    <Table className="table">
                        <tbody>
                            <tr>
                                <td className="col-5" style={{ border: 'none' }}><b>EB:</b> {dados.eb}</td>
                                <td className="col-4" style={{ border: 'none' }}><b>Viatura: </b> {dados.viatura}</td>
                                <td className="text-center" style={{ borderLeft: 'solid 1px black', borderRight: 'solid 1px black', borderTop: 'solid 1px black', borderBottom: 'none' }}>AUTORIZO</td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }}><b>Data: </b> {formatDate(dados.data)}</td>
                                <td style={{ border: 'none' }}></td>
                                <td className="text-center" style={{ borderLeft: 'solid 1px black', borderRight: 'solid 1px black', borderBottom: 'none' }}></td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }}><b>Nome: </b>{dados.motNome}</td>
                                <td style={{ border: 'none' }}></td>
                                <td className="text-center" style={{ borderLeft: 'solid 1px black', borderRight: 'solid 1px black', borderBottom: 'none' }}></td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }}><b>Hora saída: </b>{formatTime(dados.horaSaida)}</td>
                                <td style={{ border: 'none' }}></td>
                                <td className="text-center" style={{ borderLeft: 'solid 1px black', borderRight: 'solid 1px black', borderBottom: 'none' }}>_____________________</td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }}><b>Odômetro saída: </b>{dados.odmSaida}</td>
                                <td style={{ border: 'none' }}></td>
                                <td className="text-center" style={{ borderLeft: 'solid 1px black', borderRight: 'solid 1px black', borderBottom: 'solid 1px black' }}>Padrinho de VTR</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>

                <Imprimir />

            </div>
        </>
    );
}
