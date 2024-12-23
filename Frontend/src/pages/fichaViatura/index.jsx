import React from "react";
import '../../css/geral.css';
import { CardViaturas } from "../../components/card";
import Navbar from "../../components/navbar";
import { faBook, faGear, faPowerOff, faCar } from "@fortawesome/free-solid-svg-icons";


export default function FichaViatura() {

    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Ficha de Viatura</h1>
            <hr />
            <div className="d-flex align-items-center justify-content-center">
                <div className="p-5 text-center">
                    <h3>Gerar Ficha de Viatura</h3>
                    <div className="d-flex justify-content-center mt-2">
                        <CardViaturas link="/civis_pe" titulo="Consultar Ficha" icone={faGear} />
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