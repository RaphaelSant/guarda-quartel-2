import React from "react";
import './card.css';
import { Link } from "react-router-dom";

export function CardCivis(props) {
    return <Link to={props.link} className="btn card-base civis me-3"><p>{props.titulo}</p></Link>
}

export function CardMilitares(props) {
    return <Link to={props.link} className="btn card-base mil me-3"><p>{props.titulo}</p></Link>
}

export function CardOutrasOm(props) {
    return <Link to={props.link} className="btn card-base outrasOm me-3"><p>{props.titulo}</p></Link>
}

export function CardRelatorio(props) {
    return <Link to={props.link} className="btn card-base relatorio me-3"><p>{props.titulo}</p></Link>
}