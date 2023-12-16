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
  database: "sisregex",
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
app.get("/civis_pe/selectId/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM civis_pe WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
  db.query(sql, id, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.json({ message: "Registro não encontrado" });
    }
    return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
  });
});
// Rota para inserir dados.
app.post("/civis_pe", (req, res) => {
  const { cpf, data, dataEntrada, destino, horaEntrada, horaSaida, nome} = req.body;
  const sql = "INSERT INTO civis_pe (cpf, dataEntrada, destino, horaEntrada, horaSaida, nome) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [cpf, dataEntrada, destino, horaEntrada, horaSaida, nome], (err, result) => {
    if (err) return res.status(500).send(err);
    
    return res.status(200).json({ message: "Dados inseridos com sucesso!" });
  });
});
app.put("/civis_pe/:id", (req, res) => {
  const id = req.params.id;
  const { cpf, dataEntrada, destino, horaEntrada, horaSaida, nome } = req.body;
  const sql = "UPDATE civis_pe SET cpf=?, dataEntrada=?, destino=?, horaEntrada=?, horaSaida=?, nome=? WHERE id=?";

  db.query(sql, [cpf, dataEntrada, destino, horaEntrada, horaSaida, nome, id], (err, result) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json({ message: "Dados atualizados com sucesso!" });
  });
});
// Rota para deletar dados.
app.delete("/civis_pe/:id", (req, res) => {
  const civisId = req.params.id;
  const sql = `DELETE FROM civis_pe WHERE id = ?`;
  db.query(sql, civisId, (err, result) => {
    if (err) return res.json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    return res.json({ message: "Registro deletado com sucesso" });
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

// Rota protegida
app.get("/recursoProtegido", verificarToken, (req, res) => {
  res.status(200).send("Acesso permitido ao recurso protegido");
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
