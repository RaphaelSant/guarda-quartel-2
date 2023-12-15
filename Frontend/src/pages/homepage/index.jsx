import React from "react";
import '../../css/geral.css';
import { CardCivis, CardMilitares, CardOutrasOm, CardRelatorio } from "../../components/card";
import Navbar from "../../components/navbar";

export default function HomePage() {
    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Registro de entrada e saida!</h1>
            <hr />
            <h3>Civis</h3>
            <div className="d-flex mt-2">
                <CardCivis link="/civis_pe" titulo="Registro" />
                <CardCivis link="#" titulo="Veículo" />
            </div>
            <hr />
            <h3>Militares</h3>
            <div className="d-flex mt-2">
                <CardMilitares link="#" titulo="Durante o expediente" />
                <CardMilitares link="#" titulo="Fora de expediente" />
                <CardMilitares link="#" titulo="Viatura do pelotão" />
            </div>
            <hr />
            <h3>Outras Organizações Militares</h3>
            <div className="d-flex mt-2">
                <CardOutrasOm link="#" titulo="Viatura" />
            </div>
            <hr />
            <h3>Relatório</h3>
            <div className="d-flex mt-2 mb-5">
                <CardRelatorio link="#" titulo="Roteiro da Guarda" />
                <CardRelatorio link="#" titulo="Escala de Ronda" />
                <CardRelatorio link="#" titulo="Parte do Representante do Cmdo" />
                <CardRelatorio link="#" titulo="Armazenar Serviço" />
                <CardRelatorio link="#" titulo="Serviço Anterior" />
            </div>
        </div>
    </>
}