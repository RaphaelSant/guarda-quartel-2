import React from "react";
import impressaoEstilo from "./css/impressao.module.css";
import { addDays, format } from 'date-fns';
import { formatDate } from "../util/formatDateTime";

export default function ImpressaoAnteriorFooter() {
    // Recupera a data do localStorage
    const selectedDate = localStorage.getItem('selectedDate');

    // Converte a data para um objeto Date, adiciona um dia, e formata de volta para 'yyyy-MM-dd'
    const nextDate = format(addDays(new Date(selectedDate), 2), 'yyyy-MM-dd');

    return (
        <div className="d-none d-print-block text-center">
            <p>Quartel em Porto Velho - RO, {formatDate(nextDate)}.</p>
            <div className={`${impressaoEstilo.underline} ${impressaoEstilo.impressao_margem}`}></div>
            <p>Permanência 17º Pel Com Sl</p>
        </div>
    );
}