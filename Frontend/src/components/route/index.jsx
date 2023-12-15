import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, redirectDocument } from "react-router-dom";

import HomePage from "../../pages/homepage";
import CivisPe from "../../pages/civis/civis_pe";
import RegistroCivilPe from "../../pages/civis/civis_pe/novoRegistro";
import Login from "../../pages/login";

export default function Rotas() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está autenticado (pode ser uma verificação no localStorage, por exemplo)
    const token = localStorage.getItem("token");
    if (token) {
      setAutenticado(true);
    } else {
      setAutenticado(false);
    }
  }, []);

  // <Route exact path='/home' element={ <HomePage /> } />
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        {autenticado ? (
          <Route exact path="/home" Component={HomePage} />
        ) : (
          // Redirecionar para a página de Login se o usuário não estiver autenticado
          <Route path="/home" Component={Login} />
        )}

        <Route exact path="/civis_pe" element={<CivisPe />} />
        <Route exact path="/civis_pe/registro" element={<RegistroCivilPe />} />
        {/* Rotas protegidas */}
      </Routes>
    </BrowserRouter>
  );
}
