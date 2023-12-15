const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "sisconex",
});

db.connect();

// Geters

app.get("/", (re, res) => {
  return res.json("From backend side!");
});

app.get("/civis_pe", (req, res) => {
  const sql = "SELECT * FROM civis_pe";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Rota para autenticar usuário e gerar token JWT
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  const query = `SELECT * FROM usuarios WHERE usuario = ? AND senha = ?`;

  db.query(query, [usuario, senha], (err, result) => {
    if (err) {
      res.status(500).send("Erro interno");
      throw err;
    }

    if (result.length > 0) {
      // Usuário autenticado - gerar token JWT
      const token = jwt.sign({ usuario: usuario }, "seuSegredoSuperSecreto", {
        expiresIn: "2h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  });
});

// Middleware para verificar o token em rotas protegidas
function verificarToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token não fornecido");
  }

  jwt.verify(token, "seuSegredoSuperSecreto", (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    req.usuario = decoded.usuario;
    next();
  });
}

app.listen(8081, () => {
  console.log("listening");
});
