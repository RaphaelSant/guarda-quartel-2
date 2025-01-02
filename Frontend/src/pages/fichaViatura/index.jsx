import React from "react";
import '../../css/geral.css';
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import img1 from "../../assets/img/1.png";
import img2 from "../../assets/img/2.png";


export default function FichaViatura() {

    return <>
        <Navbar />
        <div className="container mt-2">
            <div className="d-flex align-items-center justify-content-center mt-4 p-0 d-print-none">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Página Inicial</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Ficha de viatura
                        </li>
                    </ol>
                </nav>
            </div>
            <h1 className="text-center">Ficha de Viatura</h1>
            <hr />

            <div className="d-flex align-items-center justify-content-center">
                <div className="p-5 text-center">
                    <h3>Gerar Ficha de Viatura</h3>
                    <div className="d-flex justify-content-center mt-2">
                        <Link to="/ficha_viaturas/gerar_ficha">
                            <img src={img1} alt="Marruá" className="rounded w-50" />
                        </Link>
                    </div>
                </div>

                <div className="p-5 text-center">
                    <h3>Consultar Fichas de Viatura</h3>
                    <div className="d-flex justify-content-center mt-2">
                        <Link to="/ficha_viaturas/consultar_ficha">
                            <img src={img2} alt="L-200 Triton" className="rounded w-50" />
                        </Link>
                    </div>
                </div>

            </div>

        </div>

        <Footer />
        
    </>
}