const express = require('express');
const request = require('request');
const port = process.env.PORT || 8000;
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const app = express();

let pokemon;

function getPokemon(req, res, next)
{
    const pokemonId = Math.floor(Math.random() * 900 ) + 1;
    const options = {
        url: `${pokeAPI}${pokemonId}`
    };
    request(options, function(err, res, body)
    {
        if (err)
        {
            console.error('request got and error:', err);
            return next();
        }
        if (res.statusCode !== 200)
        {
            console.error(`Request was not successful ${res.body}`);
            return next();
        }
        pokemon = JSON.parse(body);
        console.log(`setting global pokemon to ${pokemon.name}`);
        next();
        
    });
}
app.use(getPokemon);
function properName(str){
    return str[0].toUpperCase() + str.slice(1);
}

app.get('/', function(req, res){
    if (typeof pokemon.name !== 'string' || pokemon.name === ''){
        res.send('invalid pokemon');
        return;
    }
    
    const body = `
    
    <div>
  <img src=${pokemon.sprites.front_default}>
  <ul>
    <li>Name: ${properName(pokemon.name)}</li>
    <li>Height: ${pokemon.height}"</li>
    <li>weight: ${pokemon.weight}</li>
  </ul>
</div>`;
res.send(body);
});






app.listen(port, function(err)
{
    if (err)
    {
        console.error('error starting the server: ', err);
    }
    console.log(`server is running at port ${port}`);
});




