const button = document.getElementById("button");
const pokemonName = document.getElementById("pokemonName");
const audioElement = document.getElementById("audio");
const image = document.getElementById("imageCard");
const inputs = document.querySelectorAll("#form input");
const stats = document.getElementById("stats");
const clearPokemon = document.getElementById("clearPokemon");

// VoiceRSS Javascript SDK
const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";
    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;
        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;
        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;
        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;
        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }
      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        (audioElement.src = t.responseText), audioElement.play();
      }
    }),
      t.open("POST", "https://api.voicerss.org/", !0),
      t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return (
      "key=" +
      (e.key || "") +
      "&src=" +
      (e.src || "") +
      "&hl=" +
      (e.hl || "") +
      "&r=" +
      (e.r || "") +
      "&c=" +
      (a || "") +
      "&f=" +
      (e.f || "") +
      "&ssml=" +
      (e.ssml || "") +
      "&b64=true"
    );
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "")
      ? "mp3"
      : e.canPlayType("audio/wav").replace("no", "")
      ? "wav"
      : e.canPlayType("audio/aac").replace("no", "")
      ? "aac"
      : e.canPlayType("audio/ogg").replace("no", "")
      ? "ogg"
      : e.canPlayType("audio/x-caf").replace("no", "")
      ? "caf"
      : "";
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    throw "The browser does not support HTTP request";
  },
};

// Passing name to VoiceRSS API
function callPokemon(name) {
  VoiceRSS.speech({
    key: "07a50cd0b39c4da8b7cc1d8d9c3ddeb4",
    src: name,
    hl: "es-mx",
    v: "Jose",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
// Get Pokemon name from user, clear all Ul child elements, call text to speech API
async function getPokemon() {
  limpiarDataFromUl(stats);
  getPokemonFromAPI(nombrePokemon.value);
  addSee();
  let data = nombrePokemon.value;
  data = `${data}... Yo te elijo`;
  callPokemon(data);
  toggleButton();
  await sleep(2500);
  removeSee();
}

//Function to display data on HTML
function displayData(pokemon) {
  pokemonName.textContent = pokemon.name;
  image.src = pokemon.sprites.other.dream_world.front_default;
  for (i = 0; i < pokemon.stats.length; i++) {
    let info = document.createElement("li");
    info.setAttribute("class", "list-group-item");
    info.textContent = `Stat Base: ${pokemon.stats[i].base_stat} |  Nombre: ${pokemon.stats[i].stat.name}`;
    stats.appendChild(info);
  }
}

// Arry where data will be stored
let pokemon = [];
//Fetch Pokemon API
async function getPokemonFromAPI(nombre) {
  apiUrl = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

  try {
    // fetch request
    const response = await fetch(apiUrl);
    pokemon = await response.json();
    localStorage.setItem("data", pokemon.name);
    displayData(pokemon);
  } catch (error) {
    // catch error
  }
}

//Add class CSS to view gif ash
function addSee() {
  document.getElementById("ash").classList.add("see");
}
//Remore class CSS to hide gif ash
function removeSee() {
  document.getElementById("ash").classList.remove("see");
}
//Function sleep to set time out before an event
function sleep(ms) {
  return new Promise((val) => setTimeout(val, ms));
}
// Disable / anable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Function to remove all child elements of Ul (list)
function limpiarDataFromUl(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Event Listener
button.addEventListener("click", getPokemon);
audioElement.addEventListener("ended", toggleButton);

// // Check local storage for previous data
let dataStorage = localStorage.getItem("data");

// If local store has data we will display pokemon
if (dataStorage) {
  getPokemonFromAPI(dataStorage);
}

// Clear storage function
function clearStorage() {
  localStorage.removeItem("data");
  window.location.reload();
}
clearPokemon.addEventListener("click", clearStorage);
