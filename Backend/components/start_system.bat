@echo off
REM Abre uma nova janela do CMD e executa start_backend.bat

start cmd /k "cd /d C:\ws\guarda-quartel-2\FrontEnd && npm run dev -- --host"

REM Abre outra nova janela do CMD e executa start_frontend.bat
start cmd /k "cd /d C:\ws\guarda-quartel-2\BackEnd && npm start"