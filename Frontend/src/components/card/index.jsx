import React from "react";
import cardEstilo from './card.module.css';
import { Link } from "react-router-dom";

export function CardCivis(props) {
    return <Link to={props.link} className={`btn ${cardEstilo.card_base} ${cardEstilo.civis} me-3`}><p>{props.titulo}</p></Link>
}

export function CardMilitares(props) {
    return <Link to={props.link} className={`btn ${cardEstilo.card_base} ${cardEstilo.mil} me-3`}><p>{props.titulo}</p></Link>
}

export function CardOutrasOm(props) {
    return <Link to={props.link} className={`btn ${cardEstilo.card_base} ${cardEstilo.outrasOm} me-3`}><p>{props.titulo}</p></Link>
}

export function CardRelatorio(props) {
    return <Link to={props.link} className={`btn ${cardEstilo.card_base} ${cardEstilo.relatorio} me-3`}><p>{props.titulo}</p></Link>
}