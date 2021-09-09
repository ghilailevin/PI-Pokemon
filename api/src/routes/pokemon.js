const { Router } = require("express")
const { Pokemon, Type } = require("../db");
const fetch = require("node-fetch");

const router = Router();

var pokemonId = [];
for (let i = 1; i <= 40; i++) {
  pokemonId.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
}

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    try {
      let pokemonsFinded = await Pokemon.findAll({ include: [Type] });
      var arrayPeticiones = pokemonId.map((url) =>
        fetch(url).then((e) => e.json())
      );

      arrayPeticiones = await Promise.all(arrayPeticiones);

      var pokemonsIniciales = arrayPeticiones.map((res) => {
        let obj = {
          nombre: res.name,
          img: res.sprites.other.dream_world.front_default,
          ataque: res.stats[1].base_stat,
          types: res.types.map((t) => t.type),
          id: res.id,
        };

        return obj;
      });

      res.status(200).send(pokemonsIniciales.concat(pokemonsFinded));
    } catch (error) {
      res.send("No se encontró el Pokemon");
    }
  } else {
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (name) {
        var resp = await result.json();
        const pokemon = {
          nombre: resp.name,
          imagen: resp.sprites.other.dream_world.front_default,
          id: resp.id,
          hp: resp.stats[0].base_stat,
          ataque: resp.stats[1].base_stat,
          defensa: resp.stats[2].base_stat,
          velocidad: resp.stats[5].base_stat,
          types: resp.types,
        };

        return res.json(pokemon);
      }
    } catch (error) {
      let busqueda = Pokemon.findAll({
        where: { nombre: name },
        include: [Type],
      }).then((pokemon) => {
        if (pokemon) {
          return res.json(busqueda);
        } else return res.status(404).send("El pokemon no existe");
      });
    }
  }
});
router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  var idNum = Number(idPokemon);

  try {
    //Verifico si está dentro de la BD, donde los Pokemones creados tiene ID mayor a 2 cifras
    if (idNum.length > 2) {
      var busqueda = await Pokemon.findOne({
        where: { id: idNum, include: Type },
      });

      res.send(busqueda);
    } else {
      //Si se encuentra dentro de los Originales
      var result = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNum}`);

      var a = await result.json();
      let peso = a.weight.toString().split("");
      peso.splice(-1, 0, ",");
      let altura = a.height.toString().split("");
      altura.splice(-1, 0, ",");
      var poke = {
        id: a.id,
        nombre: a.name,
        estadistica: {
          vida: a.stats[0].base_stat,
          fuerza: a.stats[1].base_stat,
          defensa: a.stats[2].base_stat,
          velocidad: a.stats[5].base_stat,
        },

        peso: peso.join(""),
        altura: altura.join(""),
        img: a.sprites.other["official-artwork"].front_default,
        types: [],
      };

      a.types.forEach((type) => {
        for (const key in type) {
          if (key === "type") {
            poke.types.push(
              type[key].name.charAt(0).toUpperCase() + type[key].name.slice(1)
            );
          }
        }
      });
    }
    res.send(poke);
  } catch (error) {
    return res.status(404).send("No se encontro el Pokemon");
  }
});

router.post("/", async (req, res) => {
  const { nombre, img, vida, fuerza, defensa, velocidad, altura, peso, types } =
    req.body;
  console.log(req.body)
  try {
    const tiposMap = [];

    types.map((e) => tiposMap.push({ name: e }));

    await Pokemon.create(
      {
        nombre: nombre,
        img: img,
        vida: vida,
        fuerza: fuerza,
        defensa: defensa,
        velocidad: velocidad,
        altura: altura,
        peso: peso,
        types: tiposMap,
      },
      {
        include: "types",
      }
    );

    res.send("Pokemon creado correctamente");
  } catch (error) {
    return res.status(404).send("No se ha creado ningún Pokemon aún");
  }
});

module.exports = router;