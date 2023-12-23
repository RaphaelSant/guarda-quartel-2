const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const loginController = require("./controllers/loginController.js");
const civisPeController = require("./controllers/civisPeController.js");
const civisVeiculoController = require("./controllers/civisVeiculoController.js");
const pelotaoDuranteExpController = require("./controllers/pelotaoDuranteExpedController.js");
const pelotaoForaExpController = require("./controllers/pelotaoForaExpedController.js");
const pelotaoViaturaController = require("./controllers/pelotaoViaturaController.js");

const verificarToken = require("./middlewares/authMiddleware.js");

const app = express();
app.use(cors());
app.use(express.json());

// Geters
app.get("/", (re, res) => {
  return res.json("From backend side!");
});

// Controllers
app.use("/", loginController);
app.use("/", civisPeController);
app.use("/", civisVeiculoController);
app.use("/", pelotaoDuranteExpController);
app.use("/", pelotaoForaExpController);
app.use("/", pelotaoViaturaController);

// Rota protegida
app.get("/recursoProtegido", verificarToken, (req, res) => {
  res.status(200).send("Acesso permitido ao recurso protegido");
});

app.listen(8081, () => {
  console.log("listening");
});
