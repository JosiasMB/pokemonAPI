const pokemonName = document.getElementById('pokemonName');
const image = document.getElementById('imageCard');
const moves = document.getElementById('moves')

// Checking local storage
let data = localStorage.getItem('data');

// Array where data will be stored
let pokemonData = []

// Function that gets data from API
async function getMovimientosFromAPI(data){
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${data}`;
    try {
        // fetch request
        const response = await fetch(apiUrl);
       pokemonData = await response.json();
        displayMove(pokemonData);
    }catch(error){
        // catch error
    }
}

// Function to display data on HTML
function displayMove(pokemon){
    pokemonName.textContent = data;
    image.src = pokemon.sprites.other.dream_world.front_default;
    for(i=0; i<pokemon.moves.length; i++){
        let moveInfo = document.createElement('li');
        moveInfo.textContent = pokemon.moves[i].move.name;
        moves.appendChild(moveInfo);
    }
}

// Calling the function with data from local storage
getMovimientosFromAPI(data)

