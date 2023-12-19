import React from "react";

export default function clearForm() {
    const inputs = document.querySelectorAll('input'); // Seleciona todos os inputs
    return inputs.forEach((input) => {
        input.value = ''; // Limpa o valor de cada input
    });
}