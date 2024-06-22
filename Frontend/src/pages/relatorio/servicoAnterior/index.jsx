import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Estilo from "./consulta.module.css";

import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";

export default function RelatorioServicoAnterior() {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Salva a data no localStorage
        localStorage.setItem('selectedDate', selectedDate);

        window.location.href = "/relatorio_servico_anterior/consulta_servico_anterior";
    };

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
                            Consulta ao serviço anterior
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="container">
                <p className="text-center d-print-none">Consulta ao serviço anterior</p>
                <p className="text-center d-print-none">Escolha a data do serviço</p>

                <div className={`d-flex align-items-center justify-content-center m-auto ${Estilo.card}`}>
                    <form onSubmit={handleFormSubmit} className="d-print-none">
                        <div className="form-group">
                            <input
                                type="date"
                                id="data-servico"
                                className="form-control w-100"
                                value={selectedDate}
                                onChange={handleDateChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3 w-100">Consultar</button>
                    </form>
                </div>
            </div>
        </>
    );
}
