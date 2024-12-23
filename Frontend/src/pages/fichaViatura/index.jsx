import React from "react";
import '../../css/geral.css';
import { CardCivis } from "../../components/card";
import Navbar from "../../components/navbar";
import { jwtDecode } from "jwt-decode";


export default function FichaViatura() {

    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Ficha de Viatura</h1>
            <hr />
            <h3>Civis</h3>
            <div className="d-flex mt-2">
                <CardCivis link="/civis_pe" titulo="Consultar Ficha" />
                <CardCivis link="/civis_veiculo" titulo="Gerar Ficha" />
            </div>

        </div>
    </>
}