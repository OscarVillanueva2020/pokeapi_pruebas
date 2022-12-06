const express = require("express");
const { connectDB } = require('./config/db.config');
const cors = require('cors');
const pokemons = require("./routes/pokemon.routes");

const app = express();
app.use(cors());
connectDB();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando" });
});

app.use("/pokemon", pokemons);

app.listen(PORT, (req, res) => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});