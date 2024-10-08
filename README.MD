# Guia de Instalação e Configuração

1. 🐬 **Instalar o MySQL Installer Community**  
   [Baixar MySQL](https://dev.mysql.com/downloads/installer/)

2. 🟢 **Instalar o Node.js versão LTS**  
   [Baixar Node.js](https://nodejs.org/en)

3. 🐙 **Instalar o Git**  
   [Baixar Git](https://git-scm.com/)

4. 🧑‍💻 **Clonar os repositórios do GitHub**  
    4.1 Recomenda-se criar uma pasta na raiz do C:/ e realizar o clone dentro desta.
    4.1.1 Primeiro, você precisa clonar o repositório localmente. Isso traz todo o repositório, incluindo todas as branches.
   ```bash
   git clone https://github.com/RaphaelSant/guarda-quartel-2.git
   ```
   4.1.2 Depois de clonado, navegue até o diretório do repositório:
   ```bash
   cd guarda-quartel-2
   ```
   4.1.3 Você pode listar todas as branches disponíveis no repositório remoto usando:
    ```bash
   git branch -r
   ```
   4.1.4 A homologação é chamada de homologacao, você pode trocá-la usando o comando:
    ```bash
    git checkout origin/homologacao -b homologacao
    ```
    4.1.5 Verifique se você está na branch correta:Verifique se você está na branch correta:
    ```bash
    git branch
    ```

5. 📦 **Instalar os pacotes do React.js e Express.js**  
   Acesse as pastas `backend` e `frontend` e execute o comando:
   ```bash
   cd backend npm install
   cd ../frontend npm install
6. 🗂️ **Configurar o Banco de Dados**  
   Acesse a pasta `Backend > components` para encontrar a estrutura do banco de dados. Adapte o código conforme necessário para que seja executado sem erros no banco.
7. 🛠️ **Evitar Erros de Requisição no MySQL Workbench**  
   Execute o comando a seguir no MySQL Workbench:
   ```bash
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
   ```
   
8. 🚀 **Adaptar a requisição do FrontEnd**  
   No caminho a seguir substitua o localhost pelo IP do servidor para o frontend fazer a requisição correta ao backend:
   ```bash
   FrontEnd > Components > Util > dbConfig.jsx
8. 🚀 **Iniciar o BackEnd**  
   Execute os comandos:
   ```bash
   cd backend
   npm start
9. 🌐 **Iniciar o FrontEnd**  
   Execute o comando:
   ```bash
   cd ../frontend
   npm run dev -- --host
10. 🦇 **Inicio automático**  
    Acesse a pasta `Backend > components`, dentro desta existe um arquivo .bat ajuste ele com as configurações do seu ambiente.
