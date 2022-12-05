// const { v4: uuidv4 } = require("uuid");
const Pokemon = require("../model/pokemon.model");

const createPokemon = (req, res) => {
  // console.log(req.body);
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
      res.json({
        ok: true,
        pokemons,
      });
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
      res.json({
        ok: true,
        pokemon,
      });
    })
    .catch(() => {
      res.json({
        ok: false,
        msg: `Get Pokemon ID: ${id} failed.`
      });
    });
};

// const updatePokemon = (req, res) => {
//   const { id } = req.params;
//   const { name, heightInMeter, weightInKG } = req.body;

//   console.log(req.body);

//   const idToBeUpdated = id;
//   const newName = name;
//   const newHeightInMeter = heightInMeter;
//   const newWeightInKG = weightInKG;

//   const pokemonToBeUpdated = Pokemon.find(
//     (pokemon) => pokemon._id === idToBeUpdated
//   );

//   if (newName) {
//     pokemonToBeUpdated.name = newName;

//     res.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
//     it now has a updated name ${pokemonToBeUpdated.name}`);
//   }

//   if (newHeightInMeter) {
//     pokemonToBeUpdated.heightInMeter = newHeightInMeter;

//     res.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
//     it now has a updated last name ${pokemonToBeUpdated.heightInMeter}`);
//   }

//   if (newWeightInKG) {
//     pokemonToBeUpdated.weightInKG = newWeightInKG;

//     res.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
//     it now has a updated age ${pokemonToBeUpdated.weightInKG}`);
//   }
// };

// const deletePokemon = (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const idToDelete = id;

//   const pokemonTobeDelete = pokemons.find(
//     (pokemon) => pokemon.id === idToDelete
//   );
//   pokemons = pokemons.filter((pokemon) => pokemon.id !== idToDelete);

//   res.send(`pokemon with
//   \n id: ${idToDelete}
//   \n name: ${pokemonTobeDelete.name}
//   \n heightInMeter: ${pokemonTobeDelete.heightInMeter}
//   \n weightInKG: ${pokemonTobeDelete.weightInKG}
//   \n has been deleted from the database.`);
// };

module.exports = {
  createPokemon,
  getPokemons,
  getSinglePokemon,
  // updatePokemon,
  // deletePokemon,
};
