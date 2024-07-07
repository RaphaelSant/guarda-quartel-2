import React, { useEffect, useState } from "react";
import impressaoEstilo from "./css/impressao.module.css";
import { getLatestConfigServicoId } from "../configServico";

export default function ImpressaoFooter() {
    const [dataServico, setDataServico] = useState(null);
    const [dataAmanha, setDataAmanha] = useState('');

    useEffect(() => {
        const fetchDataServico = async () => {
            try {
                // Obtém a última configuração de serviço
                const dataConfig = await getLatestConfigServicoId();
                const dataServicoConfig = dataConfig.servico_ref;
                if (!dataServicoConfig) {
                    throw new Error("Nenhuma configuração encontrada.");
                }
                setDataServico(dataServicoConfig);
            } catch (error) {
                // Em caso de erro, exibe um alerta
                alert('Erro ao obter a configuração do serviço: ' + error.message);
            }
        };

        fetchDataServico();
    }, []);

    useEffect(() => {
        if (dataServico) {
            let amanha = new Date(dataServico);
            amanha.setDate(amanha.getDate() + 1); // Adiciona um dia
            const dataAmanhaFormatted = amanha.toLocaleDateString('pt-BR');
            setDataAmanha(dataAmanhaFormatted);
        }
    }, [dataServico]);

    return (
        <div className="d-none d-print-block text-center">
            <p>Quartel em Porto Velho - RO, {dataAmanha}.</p>
            <div className={`${impressaoEstilo.underline} ${impressaoEstilo.impressao_margem}`}></div>
            <p>Permanência 17º Pel Com Sl</p>
        </div>
    );
}
