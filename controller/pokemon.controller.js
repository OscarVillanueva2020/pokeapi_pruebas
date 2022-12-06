// const { v4: uuidv4 } = require("uuid");
const Pokemon = require("../model/pokemon.model");

const createPokemon = (req, res) => {
  // console.log(req.body);

  const { name } = req.body;
  try {
    let pokemon = Pokemon.find({
      name,
    });
    if (pokemon) {
      return res.status(400).json({
        msg: "Pokemon Already Exists",
      });
    }
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

    newPokemonWithID.save();

    res.status(200).json({
      ok: true,
      msg: `Pokemon ${newPokemon.name} has been captured to the database.`,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Create Pokemon failed",
    });
  }
};

const getPokemons = async (req, res) => {
  try {
    const pokemons = Pokemon.find({}, "name heightInMeter weightInKG img url");
    if(pokemons){
      res.status(200).json({
        ok: true,
        pokemons,
      });
    }else{
      res.status(404).json({
        ok: "DB empty"
      });
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Get Pokemons failed",
    });
  }
};

const getSinglePokemon = (req, res) => {
  // console.log(req.params);
  const { id } = req.params;

  Pokemon.findById({ _id: id })
    .then((pokemon) => {
      res.status(200).json({
        ok: true,
        pokemon,
      });
    })
    .catch(() => {
      res.status(500).json({
        ok: false,
        msg: `Get Pokemon ID: ${id} failed.`,
      });
    });
};

module.exports = {
  createPokemon,
  getPokemons,
  getSinglePokemon,
};
