import React from "react";
import '../../css/geral.css';
import { CardViaturas } from "../../components/card";
import Navbar from "../../components/navbar";
import { faBook, faGear, faPowerOff, faCar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export default function FichaViatura() {

    return <>
        <Navbar />
        <div className="container mt-2">
            <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Página Inicial</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Ficha de viatura
                        </li>
                    </ol>
                </nav>
            </div>
            <h1 className="text-center">Ficha de Viatura</h1>
            <hr />
            <div className="d-flex align-items-center justify-content-center">
                <div className="p-5 text-center">
                    <h3>Gerar Ficha de Viatura</h3>
                    <div className="d-flex justify-content-center mt-2">
                        <CardViaturas link="/ficha_viaturas/gerar_ficha" titulo="Consultar Ficha" icone={faGear} />
                    </div>
                </div>

                <div className="p-5 text-center">
                    <h3>Consultar Fichas de Viatura</h3>
                    <div className="d-flex justify-content-center mt-2">
                        <CardViaturas link="/civis_pe" titulo="Consultar Ficha" icone={faBook} />
                    </div>
                </div>
            </div>

        </div>
    </>
}