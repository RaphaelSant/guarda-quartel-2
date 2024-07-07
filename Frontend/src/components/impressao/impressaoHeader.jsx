import React, { useState, useEffect } from "react";
import ministerioLogo from "../../assets/img/ministerio-logo.jpg";
import { getLatestConfigServicoId } from "../configServico";

export default function ImpressaoHeader(props) {
    const [dataServico, setDataServico] = useState(null);

    useEffect(() => {
        const fetchDataServico = async () => {
            try {
                // Obtém a última configuração de serviço
                const dataConfig = await getLatestConfigServicoId();
                const dataServicoConfig = dataConfig.servico_ref;
                let dataFormatada = new Date(dataServicoConfig);
                dataFormatada = new Date(dataFormatada);
                if (!dataServicoConfig) {
                    throw new Error("Nenhuma configuração encontrada.");
                }
                setDataServico(dataFormatada.toLocaleDateString('pt-BR'));
            } catch (error) {
                // Em caso de erro, exibe um alerta
                alert('Erro ao obter a configuração do serviço: ' + error.message);
            }
        };

        fetchDataServico();
    }, []);

    return (
        <>
            <div className="position-relative w-100 d-none d-print-block">
                <div className="position-absolute top-0 start-0 border border-dark pt-5 ps-5 pe-5">
                    <div className="border-top border-dark w-100">
                        <p>SCmt</p>
                    </div>
                </div>
            </div>
            <img
                src={ministerioLogo}
                width={"100px"}
                alt="sdasd"
                className="d-none d-print-block"
            />
            <div className="d-none d-print-block text-center">
                <p>
                    <b>
                        Ministério da Defesa
                        <br />
                        Exército Brasileiro
                        <br />
                        17° Pelotão de Comunicações de Selva
                    </b>
                </p>

                <p>{props.titulo} do dia {dataServico}.</p>
            </div>
        </>
    );
}