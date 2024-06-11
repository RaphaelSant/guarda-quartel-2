import axios from "axios";
import dbConfig from "../util/dbConfig";

export const getLatestConfigServicoId = async () => {
    let servConfigID = null; // Inicializando a variável 'servConfigID'

    try {
        const responseConfig = await axios.get(`${dbConfig()}/configuracao_servico`);
        const configuracoes = responseConfig.data; // Supondo que o retorno seja um array de objetos com as configurações

        if (configuracoes.length > 0) {
            const ultimaConfiguracao = configuracoes[configuracoes.length - 1]; // Pega o último elemento do array
            servConfigID = ultimaConfiguracao;
        } else {
            console.warn("Nenhuma configuração encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar configuração:", error);
    }

    return servConfigID;
};
