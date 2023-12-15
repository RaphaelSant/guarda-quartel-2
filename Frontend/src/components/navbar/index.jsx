import React, { useState } from "react";

import logoNav from "./LogoNavbar.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [autenticado, setAutenticado] = useState(false);

  const logout = () => {
    // Limpar os dados de autenticação ao fazer logout
    localStorage.removeItem("token");
    setAutenticado(false);
    // Redirecionar para a página de login após o logout
    return (window.location.href = "/");
  };

  return (
    <nav className="navbar navbar-expand bg-body-tertiary shadow d-print-none">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logoNav} alt="Logo 17 PelCom" width="30" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex">
              <a target="_blank" className="nav-link" href="#" rel="noreferrer">
                <FontAwesomeIcon icon={faBook} /> Manual
              </a>
            </li>
            <li className="nav-item d-flex">
              <button className="nav-link" onClick={logout}>
                {" "}
                <FontAwesomeIcon icon={faPowerOff} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
