import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <div className="d-print-none bg-body-secondary shadow-lg">
            <footer className="py-5 container">
                <div className="row d-flex justify-content-between align-items-between">
                    <div className="col-6 col-md-3 mb-3">
                        <h5>Civis</h5>
                        <ul className="nav flex-column">
                            <Link to="/civis_pe">Registro de Civil</Link>
                            <Link to="/civis_veiculo">Registro de Veículos Civis</Link>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3 mb-3">
                        <h5>Militares do pelotão</h5>
                        <ul className="nav flex-column">
                            <Link to="/pelotao_durante_expediente">Mil. do Pel. durante expediente</Link>
                            <Link to="/pelotao_fora_expediente">Mil. do Pel. fora de expediente</Link>
                            <Link to="/pelotao_viatura">Viaturas do pelotão</Link>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3 mb-3">
                        <h5>Outras Organizações Militares</h5>
                        <ul className="nav flex-column">
                            <Link to="/outra_om_durante_expediente">Mil. de OOM durante expediente</Link>
                            <Link to="/outra_om_fora_expediente">Mil. de OOM fora de expediente</Link>
                            <Link to="/outra_om_viatura">Viaturas de OOM</Link>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3 mb-3">
                        <h5>Relatório</h5>
                        <ul className="nav flex-column">
                            <Link to="/relatorio_roteiro_guarda">Roteiro da guarda</Link>
                            <Link to="/relatorio_escala_ronda">Escala de ronda do comandante da guarda</Link>
                            <Link to="/relatorio_parte_sgt_permanencia">Parte do Sgt Permanência</Link>
                            <Link to="/relatorio_servico_anterior">Consulta ao serviço anterior</Link>
                        </ul>
                    </div>


                </div>

                <div className="py-4 border-top text-center">
                    <p className="m-0 p-0">&copy; 2025 | 17º Pelotão de Comunicações de Selva.</p> <br />
                    <p className="mt-0 p-0">Desenvolvido por Raphael Moura Santiago.</p>
                </div>
            </footer>
        </div>
    );
}
