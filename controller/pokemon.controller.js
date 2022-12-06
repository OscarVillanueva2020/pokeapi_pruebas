const Pokemon = require("../model/pokemon.model");

const createPokemon = (req, res) => {
  const { name } = req.body;
  const newPokemon = new Pokemon(req.body);
  const newPokemonImg =
    "https://img.pokemondb.net/artwork/large/" + name.toLowerCase() + ".jpg";
  const newPokemonURL = "https://pokemondb.net/pokedex/" + name.toLowerCase();

  const newPokemonWithID = new Pokemon({
    name: newPokemon.name,
    heightInMeter: newPokemon.heightInMeter,
    weightInKG: newPokemon.weightInKG,
    img: newPokemonImg,
    url: newPokemonURL,
  });

  newPokemonWithID.save().
  then(() => {
      res.status(201).json({
        ok: true,
        msg: `Pokemon ${newPokemon.name} has been captured to the database.`
      });
    })
    .catch(() => {
      res.status(500).json({
        ok: false,
        msg: "Create Pokemon failed",
      });
    });
};

const getPokemons = async (req, res) => {
  Pokemon.find({}, "name heightInMeter weightInKG img url")
    .then((pokemons) => {
      if(pokemons.length > 0){
        res.status(200).json({
          ok: true,
          pokemons,
        });
      } else {
        res.status(204).json({
          ok: false,
          msg: "DB Empty",
        });
      }
    })
    .catch(() => {
      res.json({
        ok: false,
        msg: "Get Pokemons failed",
      });
    });
};

const getSinglePokemon = (req, res) => {

  // console.log(req.params);
  const { id } = req.params;

  Pokemon.findById({_id: id})
    .then((pokemon) => {
      res.status(200).json({
        ok: true,
        pokemon
      });
    })
    .catch(() => {
      res.status(400).json({
        ok: false,
        msg: "Get ID Pokemon failed"
      });
    });
};

module.exports = {
  createPokemon,
  getPokemons,
  getSinglePokemon,
};
