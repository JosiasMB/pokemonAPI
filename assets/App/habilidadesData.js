const pokemonName = document.getElementById('pokemonName');
const image = document.getElementById('imageCard');
const nombreHabilidades = document.getElementById('nombreHabilidades');
const fotos = document.getElementById('fotos');

// Checking local storage
let data = localStorage.getItem('data');

// Array where data will be stored
let pokemonData = []

// Function that gets data from API
async function getHabilidadesFromAPI(data){
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
    for(i=0; i<pokemon.abilities.length; i++){
        let habilidades = document.createElement('h3');
        habilidades.textContent = pokemon.abilities[i].ability.name
        nombreHabilidades.appendChild(habilidades);
    }
}

// Calling the function with data from local storage
getHabilidadesFromAPI(data)

