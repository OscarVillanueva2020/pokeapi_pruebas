import express from 'express';

const router = express.Router();

// all requests here already starts with '/pokemons'
//send to: http://localhost:5000/pokemons
router.get('/', getPokemonFunction);

router.post('/', createPokemonFunction);

// /pokemon/2 == request.params{id:2}
router.get('/:id', getSinglePokemonFunction);

router.delete('/:id', deletePokemonFunction);

router.patch('/:id', updatePokemonFunction);

export default router;