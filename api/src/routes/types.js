const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const fetch = require("node-fetch");

const router = Router();

router.get("/", async (req, res) => {
  try {
    fetch(`https://pokeapi.co/api/v2/type`)
      .then((r) => r.json())
      .then((data) => {
        let tipos = [];
        for (let i = 0; i < data.results.length; i++) {
          var tipo = data.results[i].name;

          tipos.push(tipo);
        }
        tipos.map(async (r) => {
          try {
            await Type.create({
              nombre: r,
            });
          } catch (error) {
            console.log(error);
          }
        });
        res.send(tipos);
      });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;