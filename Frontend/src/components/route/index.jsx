import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/homepage";
import CivisPe from "../../pages/civis/civis_pe";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={ <HomePage /> } />
                <Route exact path='/civis_pe' element={ <CivisPe /> } />

            </Routes>
        </BrowserRouter>
    );
}
