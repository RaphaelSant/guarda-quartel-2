const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const civisPeController = require("./controllers/civisPeController.js");
const civisVeiculoController = require("./controllers/civisVeiculoController.js");
const loginController = require("./controllers/loginController.js");
const verificarToken = require("./middlewares/authMiddleware.js");

const app = express();
app.use(cors());
app.use(express.json());

// Geters
app.get("/", (re, res) => {
  return res.json("From backend side!");
});

// Controllers
app.use("/", civisPeController);
app.use("/", loginController);
app.use("/", civisVeiculoController);

// Rota protegida
app.get("/recursoProtegido", verificarToken, (req, res) => {
  res.status(200).send("Acesso permitido ao recurso protegido");
});

app.listen(8081, () => {
  console.log("listening");
});
