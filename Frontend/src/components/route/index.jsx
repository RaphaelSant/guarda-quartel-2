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
import ConfigServico from "../../pages/configServico/index.jsx";
import axios from "axios";
import dbConfig from "../util/dbConfig.jsx";

export default function Rotas() {
  const [autenticado, setAutenticado] = useState(false);
  const [configurado, setConfigurado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarEAutenticar = async () => {
      try {
        const autenticado = await verificarAutenticacao();
        setAutenticado(autenticado);

        const responseConfig = await axios.get(`${dbConfig()}/configuracao_servico`);
        const configuracoes = responseConfig.data; // Supondo que o retorno seja um array de objetos com as configurações
        const configurado = configuracoes.map(config => config.configurado); // Extrai a coluna 'configurado' de cada objeto
        setConfigurado(configurado);
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
        <Route exact path="/manual" element={<Manual />} />

        {/* Acesso Restrito */}
        <Route
          exact
          path="/configServico"
          element={autenticado ? <ConfigServico /> : <ErroPage />}
        />
        <Route
          exact
          path="/home"
          element={ autenticado ? (configurado == 1 ? <HomePage /> : <ConfigServico />) : <ErroPage />
          }
        />
        <Route
          exact
          path="/civis_pe"
          element={ autenticado ? (configurado == 1 ? <CivisPe /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/civis_veiculo"
          element={ autenticado ? (configurado == 1 ? <CivisVeiculo /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/pelotao_durante_expediente"
          element={ autenticado ? (configurado == 1 ? <PelotaoDuranteExped /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/pelotao_fora_expediente"
          element={ autenticado ? (configurado == 1 ? <PelotaoForaExped /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/pelotao_viatura"
          element={ autenticado ? (configurado == 1 ? <PelotaoViatura /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/outra_om_durante_expediente"
          element={ autenticado ? (configurado == 1 ? <OutraOmDuranteExpediente /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/outra_om_fora_expediente"
          element={ autenticado ? (configurado == 1 ? <OutraOmForaExpediente /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/outra_om_viatura"
          element={ autenticado ? (configurado == 1 ? <OutraOmViatura /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_roteiro_guarda"
          element={ autenticado ? (configurado == 1 ? <RelatorioRoteiroGuarda /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_escala_ronda"
          element={ autenticado ? (configurado == 1 ? <RelatorioEscalaRonda /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_parte_sgt_permanencia"
          element={ autenticado ? (configurado == 1 ? <RelatorioParteSgtPerm /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_armazenar_servico"
          element={ autenticado ? (configurado == 1 ? <ArmazenarServico /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior"
          element={ autenticado ? (configurado == 1 ? <RelatorioServicoAnterior /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/civis_registro"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorCivisRegistro /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/civis_veiculo"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorCivisVeiculo /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/pelotao_durante_expediente"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorPelotaoDuranteExpediente /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/pelotao_fora_expediente"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorPelotaoForaExpediente /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/pelotao_viatura"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorPelotaoViatura /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/outra_om_durante_expediente"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorOutraOmDuranteExpediente /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/outra_om_fora_expediente"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorOutraOmForaExpediente /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/outra_om_viatura"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorOutraOmViatura /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/roteiro_guarda"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorRelatorioRoteiroGuarda /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/escala_ronda"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorRelatorioEscalaRonda /> : <ConfigServico />) : <ErroPage />}
        />
        <Route
          exact
          path="/relatorio_servico_anterior/parte_sgt_permanencia"
          element={ autenticado ? (configurado == 1 ? <ServicoAnteriorRelatorioParteSgtPerm /> : <ConfigServico />) : <ErroPage />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}
