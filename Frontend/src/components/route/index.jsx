import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../pages/login";
import ErroPage from "../../pages/erros";

import HomePage from "../../pages/homepage";
import CivisPe from "../../pages/civis/civis_pe";
import CivisVeiculo from "../../pages/civis/civis_veiculo";
import PelotaoDuranteExped from "../../pages/pelotao/duranteExpediente";
import PelotaoForaExped from "../../pages/pelotao/foraExpediente";
import PelotaoViatura from "../../pages/pelotao/viatura";
import OutraOmDuranteExpediente from "../../pages/outraOm/duranteExpediente";
import OutraOmForaExpediente from "../../pages/outraOm/foraExpediente";
import OutraOmViatura from "../../pages/outraOm/viatura";

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
            <Route exact path="/civis_veiculo" element={<CivisVeiculo />} />
            <Route exact path="/pelotao_durante_expediente" element={<PelotaoDuranteExped />} />
            <Route exact path="/pelotao_fora_expediente" element={<PelotaoForaExped />} />
            <Route exact path="/pelotao_viatura" element={<PelotaoViatura />} />
            <Route exact path="/outra_om_durante_expediente" element={<OutraOmDuranteExpediente />} />
            <Route exact path="/outra_om_fora_expediente" element={<OutraOmForaExpediente />} />
            <Route exact path="/outra_om_viatura" element={<OutraOmViatura />} />
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
