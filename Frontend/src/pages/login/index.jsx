import React, { useState } from "react";
import axios from "axios";

import estiloLogin from "./login.module.css";
import logo from "../../assets/img/Logo.png";

import { verificarAutenticacao } from '../../components/autenticacao';
import dbConfig from "../../components/util/dbConfig";

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

        // Verifique a autenticação após o login
        const autenticado = await verificarAutenticacao();

        if (autenticado) {
          window.location.href = "/home";
          setMensagem('Usuário autenticado!');
        } else {
          setMensagem('Usuário não autenticado');
        }
      } else {
        console.log(mensagem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={estiloLogin.login_container}>
        <form className={estiloLogin.login_form}>
          <h1 className="text-center mb-4">Sistema de Registro Eletrônico</h1>
          <div className="d-flex flex-column align-items-center">
            <img src={logo} className={`${estiloLogin.logo}`} alt="..." />
          </div>
          <p className="text-center mt-4">
            17º Pelotão de Comunicações de Selva
          </p>
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
              Password
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
          {mensagem && (
            <p
              className={`${estiloLogin.msg} text-center mt-2 ${mensagem === "Usuário autenticado!"
                ? "alert alert-success"
                : "alert alert-danger"
                }`}
            >
              {mensagem}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
