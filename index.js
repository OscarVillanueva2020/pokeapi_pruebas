let express = require('express');
import pokemonsRoutes from './routes/pokemons.js';

let app = express();
let port = process.env.PORT || 3000;

app.use(express.json());

app.use('/pokemons', pokemonsRoutes); 

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
});