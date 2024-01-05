import React from "react";
import '../../css/geral.css';
import { CardCivis, CardMilitares, CardOutrasOm, CardRelatorio } from "../../components/card";
import Navbar from "../../components/navbar";
import { jwtDecode } from "jwt-decode";


export default function HomePage() {
    const token = localStorage.getItem('token');
    let isAdmin = false;

    if (token) {
        // Decodificar o token para acessar as informações
        const decodedToken = jwtDecode(token);

        // Verificar se o token indica que o usuário é administrador
        isAdmin = decodedToken && decodedToken.isAdmin === 1; // 'role' é apenas um exemplo, você deve usar a chave correta no token
    }

    console.log(token);

    const decodedToken = jwtDecode(token);

    console.log(decodedToken.isAdmin);
    console.log(isAdmin);

    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Registro de entrada e saida!</h1>
            <hr />
            <h3>Civis</h3>
            <div className="d-flex mt-2">
                <CardCivis link="/civis_pe" titulo="Registro" />
                <CardCivis link="/civis_veiculo" titulo="Veículo" />
            </div>
            <hr />
            <h3>Militares do pelotão</h3>
            <div className="d-flex mt-2">
                <CardMilitares link="/pelotao_durante_expediente" titulo="Durante o expediente" />
                <CardMilitares link="/pelotao_fora_expediente" titulo="Fora de expediente" />
                <CardMilitares link="/pelotao_viatura" titulo="Viatura do pelotão" />
            </div>
            <hr />
            <h3>Outras Organizações Militares</h3>
            <div className="d-flex mt-2">
                <CardOutrasOm link="/outra_om_durante_expediente" titulo="Durante o expediente" />
                <CardOutrasOm link="/outra_om_fora_expediente" titulo="Fora de expediente" />
                <CardOutrasOm link="/outra_om_viatura" titulo="Viatura" />
            </div>
            <hr />
            <h3>Relatório</h3>
            <div className="d-flex mt-2 mb-5">
                <CardRelatorio link="/relatorio_roteiro_guarda" titulo="Roteiro da Guarda" />
                <CardRelatorio link="/relatorio_escala_ronda" titulo="Escala de Ronda" />
                <CardRelatorio link="/relatorio_parte_sgt_permanencia" titulo="Parte do Representante do Cmdo" />
                {isAdmin && (
                    <>
                        <CardRelatorio link="/relatorio_armazenar_servico" titulo="Armazenar Serviço" />
                    </>
                )}
                <CardRelatorio link="/relatorio_servico_anterior" titulo="Serviço Anterior" />
            </div>

        </div>
    </>
}