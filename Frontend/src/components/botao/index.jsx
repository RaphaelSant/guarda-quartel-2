import React from "react";
import "./botao.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHouse, faPrint } from "@fortawesome/free-solid-svg-icons";

export function NovoRegistro(props) {
    return (
        <Link to={props.link} className="btn bnt-base btn-md btn-registro">
            <FontAwesomeIcon icon={faAddressCard} className="me-2"/>
            {props.titulo}
        </Link>
    );
}

export function PaginaInicial(props) {
    return (
        <Link to="/" className={`btn bnt-base btn-md paginaIncial me-2 ${props.estilo}`}>
            <FontAwesomeIcon icon={faHouse} className="me-2"/>
            {props.titulo}
        </Link>
    );
}

export function Voltar(props) {
    return (
        <Link to={props.link} className="btn btn-secondary btn-md">
            <i className="fa-solid fa-arrow-left"></i> Voltar
        </Link>
    );
}

export function Cancelar(props) {
    return (
        <Link to={props.link} className="btn btn-success w-100 mt-2">
            Cancelar
        </Link>
    );
}

export function Imprimir(props) {
    const tipo = props.impressao;
    function teste(tipo) {
        if (tipo === 'paisagem') {
            return (
                <div className="alert alert-primary mt-2 d-print-none" role="alert">
                    Recomenda-se imprimir esta pagina em paisagem.
                </div>
            );
        } else {
            return (
                <div className="alert alert-primary mt-2 d-print-none" role="alert">
                    Recomenda-se imprimir esta pagina em retrato.
                </div>);
        }
    }

    return (
        <>
            <button
                className={`btn btn-md btn-primary d-print-none ${props.classe}`}
                onClick={() => window.print()}
            >
                <FontAwesomeIcon icon={faPrint} /> Imprimir
            </button>
            {teste(tipo)}
        </>

    );
}