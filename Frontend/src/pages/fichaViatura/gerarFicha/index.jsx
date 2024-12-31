import React from "react";
import '../../../css/geral.css';
import Navbar from "../../../components/navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import dbConfig from "../../../components/util/dbConfig";
import clearForm from "../../../components/util/clearForm";
import Footer from "../../../components/footer";

// Registro de ficha de viatura:
const handleRegistrarSubmit = async (event) => {

    // Previne o comportamento padrão do formulário ao ser submetido (evita atualziar a página)
    event.preventDefault();

    // Coleta os valores dos campos do formulário
    const velMax = document.getElementById('velMax').value;
    const viatura = document.getElementById('viatura').value;
    const placaEb = document.getElementById('placaEb').value;
    const data = document.getElementById('data').value;
    const motorista = document.getElementById('motorista').value;
    const apresentarse = document.getElementById('apresentarse').value;
    const porOrdem = document.getElementById('porOrdem').value;
    const itinerario = document.getElementById('itinerario').value;
    const horaSaida = document.getElementById('horaSaida').value;
    const odmSaida = document.getElementById('odmSaida').value;
    const combustivel = document.getElementById('combustivel').value;
    const naturezaSv = document.getElementById('naturezaSv').value;

    // Organiza os dados coletados em um objeto
    const dados = {
        velMax,
        viatura,
        placaEb,
        data,
        motorista,
        apresentarse,
        porOrdem,
        itinerario,
        horaSaida,
        odmSaida,
        combustivel,
        naturezaSv
    };

    console.log(dados);

    try {
        // Envia uma requisição POST para adicionar um novo registro
        const response = await fetch(`${dbConfig()}/ficha_viatura`, {
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

        // Limpa o formulário após a inserção
        if (responseData.status != 400) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${responseData.message}`,
                showConfirmButton: false,
                timer: 2000
            });

            clearForm();
            // Atualiza os dados na tela após a inserção 
            // (supõe-se que fetchData() é uma função que busca os dados atualizados)
            fetchData();
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: responseData.message,
                showConfirmButton: false,
                timer: 2000
            });
        }

        // Exibe um alerta com a mensagem recebida do servidor após a inserção
        // alert(responseData.message);
        // toast.success(responseData.message);

    } catch (error) {
        // Em caso de erro na requisição, exibe um alerta
        // alert('Erro:', error);
        toast.error(error);
    }
};

export default function GerarFichaViatura() {

    return <>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Página Inicial</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to="/ficha_viaturas">Ficha de Viatura</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Gerar Ficha de Viatura
                    </li>
                </ol>
            </nav>
        </div>
        <div className="container mt-2 mb-5">
            <h1 className="text-center">Gerar Ficha de Viatura</h1>
            <hr />


            <div>
                <form className="row g-3 was-validated">
                    <div className="col-md-3">
                        <label htmlFor="velMax" className="form-label">
                            Velocidade Máxima
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex.: 60 KM/h"
                            id="velMax"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="viatura" className="form-label">
                            Viatura
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="viatura"
                            placeholder="Ex.: Triton"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="placaEb" className="form-label">
                            Placa / EB
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="placaEb"
                            placeholder="Placa ou EB"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="data" className="form-label">
                            Data
                        </label>
                        <input
                            type="date"
                            data-format="00/00/0000"
                            className="form-control"
                            id="data"
                            placeholder="Data da Ficha"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="motorista" className="form-label">
                            Motorista
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="motorista"
                            placeholder="Ex.: Sd Nome"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="apresentarse" className="form-label">
                            Apresentar-se
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="apresentarse"
                            placeholder="Ex.: Cel Nome"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="porOrdem" className="form-label">
                            Por Ordem:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="porOrdem"
                            placeholder="Ex.: Cmt Pel Com"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="itinerario" className="form-label">
                            Itinerário
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="itinerario"
                            placeholder="Ex.: Pel Com > 17 bda > 17 Cia > Pel Com"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="horaSaida" className="form-label">
                            Horário de Saída
                        </label>
                        <input
                            type="time"
                            className="form-control text-centera"
                            id="horaSaida"
                            placeholder="Insira o horário de saída"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="odmSaida" className="form-label">
                            Odômetro de Saída
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="odmSaida"
                            placeholder="Informe o odômetro de saída"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="combustivel" className="form-label">
                            Combustível
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="combustivel"
                            placeholder="Ex.: 50%"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="naturezaSv" className="form-label">
                            Natureza Sv
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="naturezaSv"
                            placeholder="Ex.: Transporte de pessoal"
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>


                    <div className="col-md-6"></div>
                </form>
            </div>
            <div className="d-grid gap-2 mt-2">
                <button type="submit" onClick={handleRegistrarSubmit} className="btn btn-success">Registrar</button>
            </div>
        </div>
        <Footer />
    </>
}