import React, { useState } from "react";
import axios from "axios";

import estiloLogin from "./login.module.css";
import logo from "../../assets/img/Logo.png";

import { verificarAutenticacao } from '../../components/autenticacao';
import dbConfig from "../../components/util/dbConfig";
import { toast } from "react-toastify";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${dbConfig()}/login`, {
        usuario: usuario,
        senha: senha
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        const responseConfig = await axios.get(`${dbConfig()}/configuracao_servico`);
        const configuracoes = responseConfig.data; // Supondo que o retorno seja um array de objetos com as configurações

        let configServicoConfigurado = 0;

        if (configuracoes.length > 0) {
          const ultimaConfiguracao = configuracoes[configuracoes.length - 1]; // Pega o último elemento do array
          const configurado = ultimaConfiguracao.configurado; // Extrai a propriedade 'configurado' do último objeto
          configServicoConfigurado = configurado;
        } else {
          console.warn("Nenhuma configuração encontrada.");
        }

        // Verifique a autenticação após o login
        const autenticado = await verificarAutenticacao();
        if (autenticado) {
          // Emitir mensagem de sucesso
          toast.success("Logado com sucesso!");

          // Adicionar um atraso antes do redirecionamento
          setTimeout(() => {
            if (configServicoConfigurado == 1) {
              window.location.href = "/home";
            } else {
              window.location.href = "/configServico";
            }
          }, 2000); // 2 segundos de atraso
        } else {
          setMensagem('Usuário não autenticado');
        }



      } else {
        // Se a resposta não contiver um token, considere como falha de autenticação
        toast.error("Usuário ou senha incorretos!");
      }
    } catch (error) {
      // Se houver um erro na requisição, exiba uma mensagem de erro genérica
      toast.error("Usuário ou senha incorretos!");
    }
  };



  return (
    <>
      <div>
        <div className={estiloLogin.login_container}>
          <h6 className="position-absolute top-0 end-0 mt-4 me-4">Versão: 02.00.00</h6>
          <h1 className="text-center mb-0">Sistema de Registro Eletrônico</h1>
          <p className="text-center mt-0 fs-5">
            17º Pelotão de Comunicações de Selva
          </p>
          <div className={estiloLogin.form}>

            <div className={estiloLogin.logo_container}>
              <div className="d-flex flex-column align-items-center">
                <img src={logo} className={`${estiloLogin.logo}`} alt="..." />
              </div>
            </div>

            <form className={estiloLogin.login_form}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Usuário
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  placeholder="Insira seu nome de usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="Senha"
                  className="form-control"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
