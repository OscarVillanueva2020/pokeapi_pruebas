import { v4 as uuidv4 } from 'uuid';
import { defaultData } from './defaultData.js';

let pokemons = []
pokemons = defaultData


//Hacer modificación para que busque en la BD al pokemon o pokemons
export const getPokemonFunction = (req, res) => {
  console.log(pokemons);
  res.send(pokemons);
}

export const createPokemonFunction = (req, res) => {
  console.log(req.body);
  const { name, heightInMeter, weightInKG } = req.body;


  const newPokemon = req.body;
  const newPokemonID = uuidv4();
  const newPokemonImg = "https://img.pokemondb.net/artwork/large/" + name.toLowerCase() + ".jpg"
  const newPokemonURL = "https://pokemondb.net/pokedex/" + name.toLowerCase()


  const newPokemonWithID = {
    ...newPokemon,
    id: newPokemonID,
    img: newPokemonImg,
    url: newPokemonURL
  };
  pokemons.save(newPokemonWithID);
  newPokemonWithID.save();

  res.send(`Pokemon ${newPokemon.name} has been captured to the database.`)
}

export const getSinglePokemonFunction = (req, res) => {
  console.log(req.params);

  const { id } = req.params;
  const foundPokemon = pokemons.find((pokemon) => pokemon.id === id);

  res.send(foundPokemon);
}

export const deletePokemonFunction = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const idToDelete = id;

  const pokemonTobeDelete = pokemons.find((pokemon) => pokemon.id === idToDelete);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== idToDelete);

  res.send(`pokemon with
  \n id: ${idToDelete} 
  \n name: ${pokemonTobeDelete.name} 
  \n heightInMeter: ${pokemonTobeDelete.heightInMeter} 
  \n weightInKG: ${pokemonTobeDelete.weightInKG} 
  \n has been deleted from the database.`)
}

export const updatePokemonFunction = (req, res) => {
  const { id } = req.params;
  const { name, heightInMeter, weightInKG } = req.body;

  console.log(req.body);

  const idToBeUpdated = id;
  const newName = name;
  const newHeightInMeter = heightInMeter;
  const newWeightInKG = weightInKG;


  const pokemonToBeUpdated = pokemons.find((pokemon) => pokemon.id === idToBeUpdated);


  if (newName) {
    pokemonToBeUpdated.name = newName;

    res.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
    it now has a updated name ${pokemonToBeUpdated.name}`);
  };

  if (newHeightInMeter) {
    pokemonToBeUpdated.heightInMeter = newHeightInMeter;

    res.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
    it now has a updated last name ${pokemonToBeUpdated.heightInMeter}`);
  };

  if (newWeightInKG) {
    pokemonToBeUpdated.weightInKG = newWeightInKG;

    res.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
    it now has a updated age ${pokemonToBeUpdated.weightInKG}`);
  };




}

