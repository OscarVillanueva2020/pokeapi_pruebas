const router = require("express").Router();
const PokemonController = require("../controller/pokemon.controller");

// all requests here already starts with '/pokemons'
//send to: http://localhost:4000/pokemon/

router.post('/', PokemonController.createPokemon);

router.get('/', PokemonController.getPokemons);

// /pokemon/2 == request.params{id:2}
router.get('/:id', PokemonController.getSinglePokemon);

module.exports = router;