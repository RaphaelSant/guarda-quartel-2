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
            <Route exact path="/relatorio_roteiro_guarda" element={<RelatorioRoteiroGuarda />} />
            <Route exact path="/relatorio_escala_ronda" element={<RelatorioEscalaRonda />} />
            <Route exact path="/relatorio_parte_sgt_permanencia" element={<RelatorioParteSgtPerm />} />
            <Route exact path="/relatorio_armazenar_servico" element={<ArmazenarServico />} />
            <Route exact path="/relatorio_servico_anterior" element={<RelatorioServicoAnterior />} />
            <Route exact path="/relatorio_servico_anterior/civis_registro" element={<ServicoAnteriorCivisRegistro />} />
            <Route exact path="/relatorio_servico_anterior/civis_veiculo" element={<ServicoAnteriorCivisVeiculo />} />
            <Route exact path="/relatorio_servico_anterior/pelotao_durante_expediente" element={<ServicoAnteriorPelotaoDuranteExpediente />} />
            <Route exact path="/relatorio_servico_anterior/pelotao_fora_expediente" element={<ServicoAnteriorPelotaoForaExpediente />} />
            <Route exact path="/relatorio_servico_anterior/pelotao_viatura" element={<ServicoAnteriorPelotaoViatura />} />
            <Route exact path="/relatorio_servico_anterior/outra_om_durante_expediente" element={<ServicoAnteriorOutraOmDuranteExpediente />} />
            <Route exact path="/relatorio_servico_anterior/outra_om_fora_expediente" element={<ServicoAnteriorOutraOmForaExpediente />} />
            <Route exact path="/relatorio_servico_anterior/outra_om_viatura" element={<ServicoAnteriorOutraOmViatura />} />
            <Route exact path="/relatorio_servico_anterior/roteiro_guarda" element={<ServicoAnteriorRelatorioRoteiroGuarda />} />
            <Route exact path="/relatorio_servico_anterior/escala_ronda" element={<ServicoAnteriorRelatorioEscalaRonda />} />
            <Route exact path="/relatorio_servico_anterior/parte_sgt_permanencia" element={<ServicoAnteriorRelatorioParteSgtPerm />} />
            <Route exact path="/manual" element={<Manual />} />

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
