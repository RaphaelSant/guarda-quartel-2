import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  redirectDocument,
} from "react-router-dom";
import axios from "axios";

import HomePage from "../../pages/homepage";
import CivisPe from "../../pages/civis/civis_pe";
import RegistroCivilPe from "../../pages/civis/civis_pe/novoRegistro";
import Login from "../../pages/login";
import ErroPage from "../../pages/erros";

export default function Rotas() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:8081/recursoProtegido",
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.status === 200) {
            setAutenticado(true);
            console.log(autenticado);
          } else {
            setAutenticado(false);
          }
        } else {
          setAutenticado(false);
        }
      } catch (error) {
        setAutenticado(false);
        // Lidar com erros de requisição
      }
    };

    verificarAutenticacao();
  }, []);

  // <Route exact path='/home' element={ <HomePage /> } />
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/erro" element={<Login />} />

        {autenticado ? (
          <>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/civis_pe" element={<CivisPe />} />
            <Route exact path="/civis_pe/registro" element={<RegistroCivilPe />}
            />
          </>
        ) : (
          // Redirecionar para a página de Login se o usuário não estiver autenticado
          <Route path="*" element={<ErroPage />} />
        )}

        {/* Rotas protegidas */}
      </Routes>
    </BrowserRouter>
  );
}
