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
import RelatorioEscalaRonda from "../../pages/relatorio/escalaRonda";
import RelatorioRoteiroGuarda from "../../pages/relatorio/roteiroGuarda";
import RelatorioParteSgtPerm from "../../pages/relatorio/parteSgtPermanencia";
import ArmazenarServico from "../../pages/relatorio/armazenarServico";
import RelatorioServicoAnterior from "../../pages/relatorio/servicoAnterior";
import ServicoAnteriorCivisRegistro from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorCivisRegistro.jsx";
import ServicoAnteriorCivisVeiculo from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorCivisVeiculo.jsx";
import ServicoAnteriorPelotaoDuranteExpediente from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorPelotaoDuranteExpediente.jsx";
import ServicoAnteriorPelotaoForaExpediente from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorPelotaoForaExpediente.jsx";
import ServicoAnteriorPelotaoViatura from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorPelotaoViatura.jsx";
import ServicoAnteriorOutraOmDuranteExpediente from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorOutraOmDuranteExpediente.jsx";
import ServicoAnteriorOutraOmForaExpediente from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorOutraOmForaExpediente.jsx";
import ServicoAnteriorOutraOmViatura from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorOutraOmViatura.jsx";
import ServicoAnteriorRelatorioRoteiroGuarda from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorRelatorioRoteiroGuarda.jsx";
import ServicoAnteriorRelatorioEscalaRonda from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorRelatorioEscalaRonda.jsx";
import ServicoAnteriorRelatorioParteSgtPerm from "../../pages/relatorio/servicoAnterior/servicoAnteriorPages/ServicoAnteriorRelatorioParteSgtPerm.jsx";
import Manual from "../../pages/manual/index.jsx";

export default function Rotas() {
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarEAutenticar = async () => {
      try {
        const autenticado = await verificarAutenticacao();
        setAutenticado(autenticado);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setCarregando(false);
      }
    };

    verificarEAutenticar();
  }, []);

  if (carregando) {
    return (
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        {/* Acesso Restrito */}
        <Route
          exact
          path="/home"
          element={autenticado ? <HomePage /> : <ErroPage />}
        />
        <Route
          exact
          path="/civis_pe"
          element={autenticado ? <CivisPe /> : <ErroPage />}
        />
        <Route
          exact
          path="/civis_veiculo"
          element={autenticado ? <CivisVeiculo /> : <ErroPage />}
        />
        <Route
          exact
          path="/pelotao_durante_expediente"
          element={autenticado ? <PelotaoDuranteExped /> : <ErroPage />}
        />
        <Route
          exact
          path="/pelotao_fora_expediente"
          element={autenticado ? <PelotaoForaExped /> : <ErroPage />}
        />
        <Route
          exact
          path="/pelotao_viatura"
          element={autenticado ? <PelotaoViatura /> : <ErroPage />}
        />
        <Route
          exact
          path="/outra_om_durante_expediente"
          element={autenticado ? <OutraOmDuranteExpediente /> : <ErroPage />}
        />
        <Route
          exact
          path="/outra_om_fora_expediente"
          element={autenticado ? <OutraOmForaExpediente /> : <ErroPage />}
        />
        <Route
          exact
          path="/outra_om_viatura"
          element={autenticado ? <OutraOmViatura /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_roteiro_guarda"
          element={autenticado ? <RelatorioRoteiroGuarda /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_escala_ronda"
          element={autenticado ? <RelatorioEscalaRonda /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_parte_sgt_permanencia"
          element={autenticado ? <RelatorioParteSgtPerm /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_armazenar_servico"
          element={autenticado ? <ArmazenarServico /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior"
          element={autenticado ? <RelatorioServicoAnterior /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/civis_registro"
          element={
            autenticado ? <ServicoAnteriorCivisRegistro /> : <ErroPage />
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/civis_veiculo"
          element={autenticado ? <ServicoAnteriorCivisVeiculo /> : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/pelotao_durante_expediente"
          element={
            autenticado ? (
              <ServicoAnteriorPelotaoDuranteExpediente />
            ) : (
              <ErroPage />
            )
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/pelotao_fora_expediente"
          element={
            autenticado ? (
              <ServicoAnteriorPelotaoForaExpediente />
            ) : (
              <ErroPage />
            )
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/pelotao_viatura"
          element={
            autenticado ? <ServicoAnteriorPelotaoViatura /> : <ErroPage />
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/outra_om_durante_expediente"
          element={
            autenticado ? (
              <ServicoAnteriorOutraOmDuranteExpediente />
            ) : (
              <ErroPage />
            )
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/outra_om_fora_expediente"
          element={
            autenticado ? (
              <ServicoAnteriorOutraOmForaExpediente />
            ) : (
              <ErroPage />
            )
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/outra_om_viatura"
          element={
            autenticado ? <ServicoAnteriorOutraOmViatura /> : <ErroPage />
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/roteiro_guarda"
          element={
            autenticado ? (
              <ServicoAnteriorRelatorioRoteiroGuarda />
            ) : (
              <ErroPage />
            )
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/escala_ronda"
          element={
            autenticado ? <ServicoAnteriorRelatorioEscalaRonda /> : <ErroPage />
          }
        />
        <Route
          exact
          path="/relatorio_servico_anterior/parte_sgt_permanencia"
          element={
            autenticado ? (
              <ServicoAnteriorRelatorioParteSgtPerm />
            ) : (
              <ErroPage />
            )
          }
        />
        <Route exact path="/manual" element={<Manual />} />
      </Routes>
    </BrowserRouter>
  );
}
