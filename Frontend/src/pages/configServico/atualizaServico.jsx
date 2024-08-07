import React, { useEffect, useState } from "react";
import '../../css/geral.css';
import Navbar from "../../components/navbar";
import dbConfig from "../../components/util/dbConfig";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import estiloAtualizar from "./atualiza.module.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AtualizarServico() {
    const [id, setId] = useState(null);
    const [data, setData] = useState("");
    const [sgtNomeGuerra, setSgtNomeGuerra] = useState("");
    const [cbNomeGuerra, setCbNomeGuerra] = useState("");
    const [motoristaNomeGuerra, setMotoristaNomeGuerra] = useState("");
    const [sdPrimeiroHorNome, setSdPrimeiroHorNome] = useState("");
    const [sdSegundoHorNome, setSdSegundoHorNome] = useState("");
    const [sdTerceiroHorNome, setSdTerceiroHorNome] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${dbConfig()}/configuracao_servico`);
                const configuracoes = res.data;
                const ultimaConfiguracao = configuracoes[configuracoes.length - 1];

                setId(ultimaConfiguracao.id);
                setData(format(new Date(ultimaConfiguracao.servico_ref), 'yyyy-MM-dd'));
                setSgtNomeGuerra(ultimaConfiguracao.sgtNomeGuerra);
                setCbNomeGuerra(ultimaConfiguracao.cbNomeGuerra);
                setMotoristaNomeGuerra(ultimaConfiguracao.motoristaNomeGuerra || "");
                setSdPrimeiroHorNome(ultimaConfiguracao.sdPrimeiroHorNome);
                setSdSegundoHorNome(ultimaConfiguracao.sdSegundoHorNome);
                setSdTerceiroHorNome(ultimaConfiguracao.sdTerceiroHorNome);
            } catch (err) {
                // alert(err);
                // console.log(err);
                toast.error(err);
            }
        };

        fetchData();
    }, []);

    const handleRegistrarSubmit = async (event) => {
        event.preventDefault();

        const dados = {
            dataServico: data,
            sgtNomeGuerra: sgtNomeGuerra,
            cbNomeGuerra: cbNomeGuerra,
            motoristaNomeGuerra: motoristaNomeGuerra && motoristaNomeGuerra.trim() !== "" ? motoristaNomeGuerra : null,
            sdPrimeiroHorario: sdPrimeiroHorNome,
            sdSegundoHorario: sdSegundoHorNome,
            sdTerceiroHorario: sdTerceiroHorNome,
        };

        try {
            const response = id ? await axios.put(`${dbConfig()}/configuracao_servico/${id}`, dados)
                : await axios.post(`${dbConfig()}/configuracao_servico`, dados);

            const responseData = response.data;

            if (response.status === 200 || response.status === 201) {
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
                });

            }

        } catch (error) {
            // alert('Erro: ' + error.message);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home">Página Inicial</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Atualizar Serviço
                            </li>
                        </ol>
                    </nav>
                </div>

                <h1 className="mt-2 text-center">Atualizar Serviço</h1>
                <p className="mt-3 text-center">Esta página proporciona a edição dos membros da guarnição de serviço, possibilitando a correção da data em que o serviço estará em vigor.</p>

                <form className="row g-3 was-validated mt-4" id="needs-validation">
                    <h4>Data do serviço</h4>

                    <div className="col-md-3">
                        <label htmlFor="data-servico" className="form-label">Data do serviço</label>
                        <input
                            type="date"
                            className="form-control"
                            id="data-servico"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sgt-nome-guerra" className="form-label">Sargento Permanência</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome de guerra"
                            id="sgt-nome-guerra"
                            maxLength="100"
                            value={sgtNomeGuerra}
                            onChange={(e) => setSgtNomeGuerra(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cb-nome-guerra" className="form-label">Cabo da guarda</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome de guerra"
                            id="cb-nome-guerra"
                            maxLength="100"
                            value={cbNomeGuerra}
                            onChange={(e) => setCbNomeGuerra(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="motorista-nome-guerra" className="form-label">Soldado (Motorista de dia)</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome de guerra"
                            id="motorista-nome-guerra"
                            maxLength="100"
                            value={motoristaNomeGuerra}
                            onChange={(e) => setMotoristaNomeGuerra(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-warning bg-gradient text-black">Campo opcional.</div>
                    </div>

                    <hr />

                    <h4>Soldados (Plantões)</h4>
                    <div className="col-md-4">
                        <label htmlFor="sd-primeiro-horario" className="form-label">1° Horário</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="1° Horário"
                            id="sd-primeiro-horario"
                            maxLength="100"
                            value={sdPrimeiroHorNome}
                            onChange={(e) => setSdPrimeiroHorNome(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="sd-segundo-horario" className="form-label">2° Horário</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="2° Horário"
                            id="sd-segundo-horario"
                            maxLength="100"
                            value={sdSegundoHorNome}
                            onChange={(e) => setSdSegundoHorNome(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="sd-terceiro-horario" className="form-label">3° Horário</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="3° Horário"
                            id="sd-terceiro-horario"
                            maxLength="100"
                            value={sdTerceiroHorNome}
                            onChange={(e) => setSdTerceiroHorNome(e.target.value)}
                            required
                        />
                        <div className="valid-feedback rounded text-center bg-success text-light">OK!</div>
                        <div className="invalid-feedback rounded text-center bg-danger text-light">Campo obrigatório.</div>
                    </div>

                    <hr />

                    <button className="btn btn-success" onClick={handleRegistrarSubmit} type="submit">Salvar</button>
                    <Link to="/home" className={`${estiloAtualizar.botao_cancelar}`}><button className={`${estiloAtualizar.botao_cancelar} btn btn-danger`} type="submit">Cancelar</button></Link>
                </form>
            </div>
        </>
    );
}
