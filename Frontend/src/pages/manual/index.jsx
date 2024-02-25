import React from "react";
import '../../css/geral.css';
import { CardCivis, CardMilitares, CardOutrasOm, CardRelatorio } from "../../components/card";
import Navbar from "../../components/navbar";
import { jwtDecode } from "jwt-decode";


export default function Manual() {
    const token = localStorage.getItem('token');
    let isAdmin = false;

    if (token) {
        // Decodificar o token para acessar as informações
        const decodedToken = jwtDecode(token);

        // Verificar se o token indica que o usuário é administrador
        isAdmin = decodedToken && decodedToken.isAdmin === 1; // 'role' é apenas um exemplo, você deve usar a chave correta no token
    }

    
    const decodedToken = jwtDecode(token);
    
    //console.log(token);
    //console.log(decodedToken.isAdmin);
    //console.log(isAdmin);

    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Manual</h1>
            <hr />
        </div>
    </>
}