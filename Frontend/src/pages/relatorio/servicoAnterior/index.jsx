import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";

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
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/pelotao_durante_expediente">Pelotão Durante o Expediente</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/pelotao_fora_expediente">Pelotão Fora de Expediente</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/pelotao_viatura">Pelotão Viatura</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/outra_om_durante_expediente">Outras OM Durante o Expediente</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/outra_om_fora_expediente">Outras OM Fora do horário de Expediente</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/outra_om_viatura">Outras OM Viatura</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/roteiro_guarda">Roteiro da Guarda</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/escala_ronda">Escala de Ronda</Link>
                    <Link className="list-group-item list-group-item-action" to="/relatorio_servico_anterior/parte_sgt_permanencia">Parte do Sgt Permanência</Link>
                </div>
            </div>


        </>
    );
}
