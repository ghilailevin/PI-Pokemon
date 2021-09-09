const { Router } = require("express");
const { fetch } = require("node-fetch");
const { Pokemon } = require("../db");

const pokemonRouter = require("./pokemon.js");
const typeRouter = require("./types.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/type", typeRouter);


module.exports = router;
