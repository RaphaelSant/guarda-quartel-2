import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import {
    EditarRegistros,
} from "../../../components/botao";

export default function RelatorioServicoAnterior() {

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Página Inicial</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Escala de ronda do comandante da guarda
                        </li>
                    </ol>
                </nav>
            </div>
            <p className="text-center d-print-none">Escala de ronda do comandante da guarda</p>

            <div className="container">
                <div className="list-group">
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/civis_registro">Civis registro</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/civis_veiculo">Civis veículo</Link>
                    <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                    <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                    <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                    <a className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
                </div>
            </div>


        </>
    );
}
