import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/homepage";
import CivisPe from "../../pages/civis/civis_pe";
import RegistroCivilPe from "../../pages/civis/civis_pe/novoRegistro";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={ <HomePage /> } />
                <Route exact path='/civis_pe' element={ <CivisPe /> } />
                <Route exact path='/civis_pe/registro' element={ <RegistroCivilPe /> } />

            </Routes>
        </BrowserRouter>
    );
}
