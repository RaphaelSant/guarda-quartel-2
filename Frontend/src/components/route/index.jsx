import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/homepage";
import CivisPe from "../../pages/civis/civis_pe";
import Login from "../../pages/login";
import ConfigSv from "../../pages/configuracaoSv"
import ErroPage from "../../pages/erros";

import { verificarAutenticacao } from "../autenticacao";

export default function Rotas() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarEAutenticar = async () => {
      const autenticado = await verificarAutenticacao();
      setAutenticado(autenticado);
    };

    verificarEAutenticar();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        {autenticado ? (
          <>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/civis_pe" element={<CivisPe />} />
            <Route exact path="/config_sv" element={<ConfigSv />} />
          </>
        ) : (
          // Redirecionar para a página de Login se o usuário não estiver autenticado
          <Route path="*" element={<ErroPage />} />
        )
        }
      </Routes>
    </BrowserRouter>
  );
}
