import React from "react";
import '../../css/geral.css';
import Navbar from "../../components/navbar";
import dbConfig from "../../components/util/dbConfig";
import Swal from "sweetalert2";
import { toast } from "react-toastify";



export default function ConfigServico() {

    // Create da configuração:
    const handleRegistrarSubmit = async (event) => {

        // Previne o comportamento padrão do formulário ao ser submetido (evita atualziar a página)
        event.preventDefault();

        // Coleta os valores dos campos do formulário
        const dataServico = document.getElementById('data-servico').value;
        const sgtNomeGuerra = document.getElementById('sgt-nome-guerra').value;
        const cbNomeGuerra = document.getElementById('cb-nome-guerra').value;
        const motoristaNomeGuerra = document.getElementById('motorista-nome-guerra').value;
        const sdPrimeiroHorario = document.getElementById('sd-primeiro-horario').value;
        const sdSegundoHorario = document.getElementById('sd-segundo-horario').value;
        const sdTerceiroHorario = document.getElementById('sd-terceiro-horario').value;
        const configurado = 1;

        // Organiza os dados coletados em um objeto
        const dados = {
            configurado,
            dataServico,
            sgtNomeGuerra,
            cbNomeGuerra,
            motoristaNomeGuerra,
            sdPrimeiroHorario,
            sdSegundoHorario,
            sdTerceiroHorario,
        };

        try {
            const response = await fetch(`${dbConfig()}/configuracao_servico`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            const responseData = await response.json();

            if (response.status === 201) {
                // Limpa o formulário após a inserção
                // alert(responseData.message);
                // window.location.href = "/home";

                Swal.fire({
                    title: 'Sucesso!',
                    text: responseData.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-success btn-lg',
                    }
                }).then(() => {
                    window.location.href = "/home";
                });
            }

        } catch (error) {
            // alert('Erro: ' + error.message);
            toast.error(error.message);
        }
    };

    return <>
        <Navbar />
        <div className="container">

            <h1 className="mt-4 text-center">Configuração do serviço</h1>
            <p className="mt-3 text-center">Esta página proporciona a configuração inicial do serviço, possibilitando a definição da data em que o serviço estará em vigor.</p>

            <form className="row g-3 was-validated mt-4" onSubmit={handleRegistrarSubmit}>
                <h4>Data do serviço</h4>
                <div className="col-md-3">
                    <label htmlFor="data-servico" className="form-label">
                        Data do serviço
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="data-servico"
                        required
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
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="motorista-nome-guerra" className="form-label">
                        Soldado (Motorista de dia)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome de guerra"
                        id="motorista-nome-guerra"
                        maxLength="100"
                        required
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
                    />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Campo obrigatório.</div>
                </div>

                <button className="btn btn-success" type="submit">Salvar</button>

            </form>
        </div>
    </>
}