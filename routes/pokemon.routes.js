const router = require("express").Router();
const PokemonController = require("../controller/pokemon.controller");

// all requests here already starts with '/pokemons'
//send to: http://localhost:4000/pokemon/

router.post('/', PokemonController.createPokemon);

router.get('/', PokemonController.getPokemons);

router.get('/:id', PokemonController.getSinglePokemon);


module.exports = router;