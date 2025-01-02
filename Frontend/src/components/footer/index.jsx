import React from "react";
import Logo from "../../assets/img/system_logo.png";

import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <div className="d-print-none bg-body-secondary shadow-lg">
            <footer className="pt-5 container">
                <div className="row d-flex justify-content-between align-items-start">
                    <div className="col-4 col-md-2 mb-3">
                        <h5>Civis</h5>
                        <ul className="nav flex-column">
                            <Link to="/civis_pe" className="link-dark">Registro de Civil</Link>
                            <Link to="/civis_veiculo" className="link-dark">Registro de Veículos Civis</Link>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Mil. do pelotão</h5>
                        <ul className="nav flex-column">
                            <Link to="/pelotao_durante_expediente" className="link-dark">Mil. do Pel. durante exp.</Link>
                            <Link to="/pelotao_fora_expediente" className="link-dark">Mil. do Pel. fora de exp.</Link>
                            <Link to="/pelotao_viatura" className="link-dark">Viaturas do pelotão</Link>
                        </ul>
                    </div>

                    <div className="col-4 col-md-2 mb-3">
                        <h5>Outras OMs</h5>
                        <ul className="nav flex-column">
                            <Link to="/outra_om_durante_expediente" className="link-dark">Mil. de OOM durante exp.</Link>
                            <Link to="/outra_om_fora_expediente" className="link-dark">Mil. de OOM fora de exp.</Link>
                            <Link to="/outra_om_viatura" className="link-dark">Viaturas de OOM</Link>
                        </ul>
                    </div>

                    <div className="col-4 col-md-2 mb-3">
                        <h5>Relatório</h5>
                        <ul className="nav flex-column">
                            <Link to="/relatorio_roteiro_guarda" className="link-dark">Roteiro da guarda</Link>
                            <Link to="/relatorio_escala_ronda" className="link-dark">Esc. de ronda cmt da gda</Link>
                            <Link to="/relatorio_parte_sgt_permanencia" className="link-dark">Parte do Sgt Permanência</Link>
                            <Link to="/relatorio_servico_anterior" className="link-dark">Consulta ao sv anterior</Link>
                        </ul>
                    </div>

                    <div className="col-4 col-md-2 mb-3">
                        <h5>Ficha de viatura</h5>
                        <ul className="nav flex-column">
                            <Link to="/ficha_viaturas/gerar_ficha" className="link-dark">Gerar Ficha de Viatura</Link>
                            <Link to="/ficha_viaturas/consultar_ficha" className="link-dark">Consultar Fichas de Viatura</Link>
                        </ul>
                    </div>
                </div>

            </footer>
            <div className="py-4 border-top border-black text-center d-flex align-items-center justify-content-center">
                <div className="w-25">
                    <img src={Logo} alt="Logo Sentry" className="w-75" />
                </div>
                <div>
                    <p className="m-0 p-0">&copy; 2025 | 17º Pelotão de Comunicações de Selva.</p> <br />
                    <p className="mt-0 p-0">Desenvolvido por Raphael Moura Santiago.</p>
                </div>
            </div>
        </div>
    );
}
