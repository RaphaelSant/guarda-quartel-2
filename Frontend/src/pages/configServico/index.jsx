import React from "react";
import '../../css/geral.css';
import Navbar from "../../components/navbar";



export default function ConfigServico() {

    // Create da configuração:
    const handleRegistrarSubmit = async (event) => {

        // Previne o comportamento padrão do formulário ao ser submetido (evita atualziar a página)
        event.preventDefault();

        // Coleta os valores dos campos do formulário
        const postoGraduacaoRegistro = document.getElementById('pg').value;
        const nomeGuerraRegistro = document.getElementById('nome-guerra').value;
        const idtMilitarRegistro = document.getElementById('idt-mil').value;
        const dataEntradaRegistro = document.getElementById('data-entrada').value;
        const horaEntradaRegistro = document.getElementById('hora-entrada').value;
        const horaSaidaRegistro = document.getElementById('hora-saida').value;
        const origemRegistro = document.getElementById('origem').value;

        // Organiza os dados coletados em um objeto
        const dados = {
            postoGraduacaoRegistro,
            nomeGuerraRegistro,
            idtMilitarRegistro,
            dataEntradaRegistro,
            horaEntradaRegistro: horaEntradaRegistro && horaEntradaRegistro.trim() !== "" ? horaEntradaRegistro : null,
            horaSaidaRegistro: horaSaidaRegistro && horaSaidaRegistro.trim() !== "" ? horaSaidaRegistro : null,
            origemRegistro,
        };

        try {
            // Envia uma requisição POST para adicionar um novo registro
            const response = await fetch(`${dbConfig()}/pelotao_durante_expediente`, {
                // Utiliza o método POST
                method: 'POST',
                headers: {
                    // Define o tipo de conteúdo como JSON
                    'Content-Type': 'application/json',
                },
                // Converte o objeto 'dados' para JSON e o envia no corpo da requisição
                body: JSON.stringify(dados),
            });

            // Converte a resposta da requisição para JSON
            const responseData = await response.json();

            if (responseData.status != 400) {
                // Limpa o formulário após a inserção
                clearForm();
                // Atualiza os dados na tela após a inserção 
                // (supõe-se que fetchData() é uma função que busca os dados atualizados)
                fetchData();
            }

            // Exibe um alerta com a mensagem recebida do servidor após a inserção
            alert(responseData.message);


        } catch (error) {
            // Em caso de erro na requisição, exibe um alerta
            alert('Erro:', error);
        }
    };

    return <>
        <Navbar />
        <div className="container">

            <h1 className="mt-4 text-center">Configuração do serviço</h1>
            <p className="mt-3 text-center">Esta página proporciona a configuração inicial do serviço, possibilitando a definição da data em que o serviço estará em vigor. <br />Esta etapa é fundamental para garantir a precisão das consultas aos serviços anteriores. Ao configurar corretamente a data de início do serviço, os usuários asseguram que os registros anteriores possam ser facilmente acessados e consultados, promovendo uma gestão eficiente e organizada das informações relacionadas ao serviço.</p>

            <form className="row g-3 was-validated mt-4">
                <h4>Data do serviço</h4>
                <div className="col-md-3">
                    <label htmlFor="sgt-nome-guerra" className="form-label">
                        Data do serviço
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Nome de guerra"
                        id="sgt-nome-guerra"
                        maxLength="100"
                        required
                    //value={sgtNomeGuerra}
                    //onChange={(e) => setSgtNomeGuerra(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="sgt-nome-guerra" className="form-label">
                        Sargento Permanência
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome de guerra"
                        id="sgt-nome-guerra"
                        maxLength="100"
                        required
                    //value={sgtNomeGuerra}
                    //onChange={(e) => setSgtNomeGuerra(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="cb-nome-guerra" className="form-label">
                        Cabo da guarda
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome de guerra"
                        id="cb-nome-guerra"
                        maxLength="100"
                        required
                    //value={cbNomeGuerra}
                    //onChange={(e) => setCbNomeGuerra(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="sd-nome-guerra" className="form-label">
                        Soldado (Motorista de dia)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome de guerra"
                        id="sd-nome-guerra"
                        maxLength="100"
                        required
                    //value={sdNomeGuerra}
                    //onChange={(e) => setSdNomeGuerra(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo opcional.</div>
                </div>

                <hr />
                <h4>Soldados (Plantões)</h4>
                <div className="col-md-4">
                    <label htmlFor="sd-primeiro-horario" className="form-label">
                        1° Horário
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="1° Horário"
                        id="sd-primeiro-horario"
                        maxLength="100"
                        required
                    //value={sdPrimeiroHorNome}
                    //onChange={(e) => setSdPrimeiroHorNome(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="sd-segundo-horario" className="form-label">
                        2° Horário
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="2° Horário"
                        id="sd-segundo-horario"
                        maxLength="100"
                        required
                    //value={sdSegundoHorNome}
                    //onChange={(e) => setSdSegundoHorNome(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="sd-terceiro-horario" className="form-label">
                        3° Horário
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="3° Horário"
                        id="sd-terceiro-horario"
                        maxLength="100"
                        required
                    //value={sdTerceiroHorNome}
                    //onChange={(e) => setSdTerceiroHorNome(e.target.value)}
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
            </form>
        </div>
    </>
}