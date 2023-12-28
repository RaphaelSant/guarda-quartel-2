import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import clearForm from "../../../components/util/clearForm";
import dbConfig from "../../../components/util/dbConfig";
import { Cancelar } from "../../../components/botao";

export default function ArmazenarServico() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${dbConfig()}/armazenar_servico`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Falha ao copiar dados');
            }

            console.log('Dados copiados com sucesso!');
        } catch (error) {
            console.error('Erro:', error.message);
            setError('Erro ao copiar dados');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                <i className="fa-solid fa-triangle-exclamation"></i> Atenção!{" "}
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Os dados ficarão disponíveis apenas para consulta e impressão por um período de 24 horas (Até a passagem do serviço atual) no Menu -Serviço Anterior-.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={handleClick} disabled={isLoading}>
                                {isLoading ? 'Copiando...' : 'Copiar Dados'}
                            </button>
                            
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Fechar
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <Navbar />
            <div className="container">
                <h5 className="mt-4 mb-0 text-center d-print-none">
                    Relatório &gt;{" "}
                    <strong style={{ color: "#008BD2" }}>Armazenar Serviço</strong>
                </h5>
                <p className="text-center d-print-none">Amazenamento de Serviço</p>
                <div className="w-50 m-auto">
                    <p className="text-justify">
                        O Menu "Armazenar Serviço" é uma ferramenta extremamente delicada.
                        Ao utilizá-lo, você estará arquivando suas informações atuais,
                        tornando-as disponíveis <strong>apenas</strong> para consulta e
                        impressão por um período de 24 horas (Até a passagem do serviço
                        atual) no Menu "Serviço Anterior".
                    </p>
                </div>
                <div className="w-50 m-auto">
                    <button
                        type="button"
                        className="btn btn-danger w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Armazenar Serviço
                    </button>
                    <Cancelar link="/home" />
                </div>
            </div>
        </>
    );
}
