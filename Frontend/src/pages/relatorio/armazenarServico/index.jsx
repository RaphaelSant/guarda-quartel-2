import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "../../../css/estiloTabela.css";

import Navbar from "../../../components/navbar";
import clearForm from "../../../components/util/clearForm";
import dbConfig from "../../../components/util/dbConfig";
import { Cancelar } from "../../../components/botao";
import { Link } from "react-router-dom";

export default function ArmazenarServico() {

    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef(null);
    const isLoadingRef = useRef(isLoading); // Usado para manter o valor mais recente de isLoading

    // Atualiza a referência sempre que isLoading muda
    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    const handleFinalizarServico = () => {
        setIsLoading(true); // Ativa o estado de carregamento

        // Mantém o estado de carregamento por pelo menos 5 segundos
        timeoutRef.current = setTimeout(async () => {
            if (isLoadingRef.current) {
                try {
                    const response = await axios.put(`${dbConfig()}/finaliza_servico`, {}, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    alert(response.data.message);

                } catch (error) {
                    console.error("Erro:", error);
                    alert("Ocorreu um erro ao finalizar o serviço.");
                } finally {
                    setIsLoading(false);
                    timeoutRef.current = null;
                }
            }
        }, 5000);
    };

    const handleCancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsLoading(false);
        alert("Operação cancelada");
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
                            Os dados ficarão disponíveis apenas para consulta e impressão no Menu <strong>Serviço Anterior</strong>.
                        </div>
                        <div className="modal-footer">

                            <button className="btn btn-danger" onClick={handleFinalizarServico} disabled={isLoading}>
                                {isLoading ? "Finalizando..." : "Finalizar Serviço"}
                            </button>
                            {isLoading && (
                                <button className="btn btn-alert" onClick={handleCancel} disabled={!isLoading}>
                                    Cancelar
                                </button>
                            )}

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
                <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home">Página Inicial</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Amazenamento de Serviço
                            </li>
                        </ol>
                    </nav>
                </div>
                <h4 className="text-center d-print-none">Amazenamento de Serviço</h4>
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
