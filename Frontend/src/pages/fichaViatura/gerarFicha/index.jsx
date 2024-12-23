import React from "react";
import '../../../css/geral.css';
import Navbar from "../../../components/navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function GerarFichaViatura() {

    return <>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Página Inicial</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to="/ficha_viaturas">Ficha de Viatura</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Gerar Ficha de Viatura
                    </li>
                </ol>
            </nav>
        </div>
        <div className="container mt-2">
            <h1 className="text-center">Gerar Ficha de Viatura</h1>
            <hr />


            <div>
                <form className="row g-3 was-validated">
                    <div className="col-md-3">
                        <label htmlFor="velocidade-maxima" className="form-label">
                            Velocidade Máxima
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: 60 KM/h"
                            id="velocidade-maxima"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="viatura" className="form-label">
                            Viatura
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="viatura"
                            placeholder="Ex: Triton"
                            required
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="placa-eb" className="form-label">
                            Placa / EB
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="placa-eb"
                            placeholder="Placa ou EB"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="data-ficha" className="form-label">
                            Data
                        </label>
                        <input
                            type="date"
                            data-format="00/00/0000"
                            className="form-control"
                            id="data-ficha"
                            placeholder="Data da Ficha"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="motorista" className="form-label">
                            Motorista
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="motorista"
                            placeholder="Ex: Sd Nome"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="apresentar" className="form-label">
                            Apresentar-se
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="apresentar"
                            placeholder="Ex: Cel Nome"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>



                    <div className="col-md-3">
                        <label htmlFor="data-entrada" className="form-label">
                            Horário
                        </label>
                        <input
                            type="date"
                            data-format="00/00/0000"
                            className="form-control"
                            id="data-entrada"
                            placeholder="Insira a data de entrada"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="data-entrada" className="form-label">
                            Por Ordem:
                        </label>
                        <input
                            type="date"
                            data-format="00/00/0000"
                            className="form-control"
                            id="data-entrada"
                            placeholder="Insira a data de entrada"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="destino" className="form-label">
                            Natureza Sv
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="destino"
                            placeholder="Insira o destino"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="destino" className="form-label">
                            Itinerário
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="destino"
                            placeholder="Insira o destino"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="destino" className="form-label">
                            Horário de Saída
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="destino"
                            placeholder="Insira o destino"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="destino" className="form-label">
                            Odômetro
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="destino"
                            placeholder="Insira o destino"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>



                    <div className="col-md-6"></div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-md btn-success">Registrar</button>
            </div>
            <div className="status"></div>
        </div>
    </>
}