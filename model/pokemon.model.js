const mongoose = require("mongoose");

const PokemonSchema = mongoose.Schema({
  name: { type: String, required: true  },
  heightInMeter: { type: String, required: true },
  weightInKG: { type: String, required: true },
  img:{ type: String  },
  url:{ type: String },
  id:{ type: String}
});

// export model user with UserSchema
module.exports = mongoose.model("pokemon", PokemonSchema);