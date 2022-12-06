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
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(404).json({ message: "Not Found " });
});

app.use("/pokemon", pokemons);

app.listen(PORT, (req, res) => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});