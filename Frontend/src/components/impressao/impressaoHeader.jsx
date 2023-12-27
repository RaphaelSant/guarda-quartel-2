import React from "react";
import ministerioLogo from "../../assets/img/ministerio-logo.jpg";

export default function ImpressaoHeader(props) {
    let ontem = new Date().setHours(-1);
    ontem = new Date(ontem); // o comando setHours devolve a data em milisegundos
    const dataOntem = ontem.toLocaleDateString('pt-BR');

    return (
        <>
            <div className="position-relative w-100 d-none d-print-block">
                <div className="position-absolute top-0 start-0 border border-dark pt-5 ps-5 pe-5 ">
                    <div className="border-top border-dark w-100">
                        <p>SCmt</p>
                    </div>
                </div>
            </div>
            <img
                src={ministerioLogo}
                width={"100px"}
                alt="sdasd"
                className="d-none d-print-block"
            />
            <div className="d-none d-print-block text-center">
                <p>
                    <b>
                        Ministério da Defesa
                        <br />
                        Exército Brasileiro
                        <br />
                        17° Pelotão de Comunicações de Selva
                    </b>
                </p>

                <p>{props.titulo} do dia {dataOntem}.</p>
            </div>
        </>
    );
}