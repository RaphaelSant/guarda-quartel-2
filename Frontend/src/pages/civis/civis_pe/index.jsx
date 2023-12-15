import React, { useEffect, useState } from "react";
import { Imprimir, NovoRegistro, PaginaInicial } from "../../../components/botao";
import ImpressaoHeader from "../../../components/impressao/impressaoHeader";
import ImpressaoFooter from "../../../components/impressao/impressaoFooter";
import estiloImpressao from "../../../components/impressao/css/PrintPortrait.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../../../css/estiloTabela.css";
import Navbar from "../../../components/navbar";


export default function CivisPe() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/civis_pe')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    });

    const deleteCivilConfirmacao = (id, nome, cpf) => {
        if (window.confirm(`Tem certeza que deseja deletar ${nome} com CPF ${cpf}?`)) {
            fetch(`http://localhost:8081/${'civis_pe'}/${id}`, {  // Substitua 'sua_tabela' pelo nome da tabela desejada
                method: 'DELETE',
            })
                .then(res => {
                    if (res.ok) {
                        const updatedData = data.filter(civil => civil.id !== id);
                        setData(updatedData);
                    } else {
                        throw new Error('Erro ao deletar');
                    }
                })
                .catch(err => console.error('Erro ao deletar:', err));
        }
    };


    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to='/'>Página Inicial</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Registro de Civil</li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Entrada e saída de civis</p>
            <div className="text-center mb-4 d-print-none">
                <PaginaInicial titulo="Página Inicial" />
                <NovoRegistro link="/civis_pe/registro" titulo="Novo Registro" />
            </div>
            <div className={`container d-flex flex-column justify-content-center align-items-center ${estiloImpressao.container_local}`}>
                <ImpressaoHeader titulo="Entrada e saída de civis" />

                <table className="table text-center table-bordered border-dark-subtle table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Data</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Sv Ref</th>
                            <th scope="col" className="d-print-none">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((civis) => {
                            let id = civis.id;
                            return (
                                <tr key={civis.id} className="align-middle">
                                    <td>{civis.nome}</td>
                                    <td>{civis.cpf}</td>
                                    <td>{civis.dia}</td>
                                    <td>{civis.horarioEntrada}</td>
                                    <td className={`${civis.horarioSaida === "OM" ? 'bg-danger text-white fw-bold' : ''}`}>{civis.horarioSaida}</td>
                                    <td>{civis.destino}</td>
                                    <td>Data Ref</td>
                                    <td className="d-print-none">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div>
                                                <Link to={"/civis/civil/editarRegistro/" + id}>
                                                    <button className="bnt-acao">
                                                        <FontAwesomeIcon icon={faPenToSquare} color="#FFD700" />
                                                    </button>
                                                </Link>
                                            </div>
                                            <div>
                                                <button
                                                    className="bnt-acao"
                                                    onClick={() => deleteCivilConfirmacao(id, civis.nome, civis.cpf)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} color="#FF0000" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Imprimir impressao="retrato" />
                <ImpressaoFooter />
            </div>
        </>
    )
}