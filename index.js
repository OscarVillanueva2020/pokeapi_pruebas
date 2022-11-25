const express = require("express");
const { connectDB } = require('./config/db.config');
const bodyParser = require("body-parser");
const cors = require('cors');
/* const pokemonModel = require("./routes/pokemon.routes"); */
const pokemonModel = require("./model/pokemon.model");

const app = express();
app.use(cors());
connectDB();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */

app.use("/pokemon", pokemonModel);
/* app.use("/subject", subject); */

app.listen(PORT, (req, res) => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});