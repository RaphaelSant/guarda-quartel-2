import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "../../css/estiloTabela.css";

import Navbar from "../../components/navbar";
import {
    NovoRegistro2,
} from "../../components/botao";
import clearForm from "../../components/util/clearForm";

export default function ConfiguracaoSv() {

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
                            Configuração do Serviço
                        </li>
                    </ol>
                </nav>
            </div>
            <h4 className="text-center d-print-none">Configuração do Serviço</h4>
            
            
            
        </>
    );
}
