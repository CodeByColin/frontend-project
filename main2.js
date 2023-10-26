// Get DOM elements
const inputValue = document.getElementById('search');
const pokeBtn = document.getElementById('btn');
const pokeContainer = document.getElementById('poke_container');
let pokemonQueue = [];

const pokeVideoContainer = document.getElementById('pokeVideoContainer');
const closePokeVideo = document.getElementById('closePokeVideo');

// Function to open the video container
function openPokeVideo() {
  pokeVideoContainer.style.display = 'block';
}

// Function to close the video container
function closePokeVideoContainer() {
  pokeVideoContainer.style.display = 'none';
}

// Add a "load" event listener to open the video container when the page loads
window.addEventListener('load', openPokeVideo);

// Add a "click" event listener to close the video container
closePokeVideo.addEventListener('click', closePokeVideoContainer);

// Add a "click" event listener to the "Choose that Pokemon" button
pokeBtn.addEventListener('click', function() {
  const chosenPoke = inputValue.value;
  getPokemon(chosenPoke);
});

// Function to populate the queue with Pokemon IDs
function allPokemon() {
  for (let i = 1; i <= 1010; i++) {
    pokemonQueue.push(i);
  }
  processNextPokemon();
}

// Initialize the process by populating the queue with Pokemon IDs
allPokemon();

// Function to clear the displayed Pokemon
function clearPokemon() {
  pokeContainer.innerHTML = '';
}

// Add "click" event listeners for region buttons
kantoBtn.addEventListener('click', () => displayPokemonByRegion('kanto'));
johtoBtn.addEventListener('click', () => displayPokemonByRegion('johto'));
hoennBtn.addEventListener('click', () => displayPokemonByRegion('hoenn'));
sinnohBtn.addEventListener('click', () => displayPokemonByRegion('sinnoh'));
unovaBtn.addEventListener('click', () => displayPokemonByRegion('unova'));
kalosBtn.addEventListener('click', () => displayPokemonByRegion('kalos'));
alolaBtn.addEventListener('click', () => displayPokemonByRegion('alola'));
galarBtn.addEventListener('click', () => displayPokemonByRegion('galar'));
paldeaBtn.addEventListener('click', () => displayPokemonByRegion('paldea'));
allBtn.addEventListener('click', function() {
    clearPokemon();
    allPokemon();
})

// Function to display Pokemon from a specific region
function displayPokemonByRegion(region) {
  clearPokemon();

  let startId, endId;

  // Determine the range of Pokemon IDs based on the selected region
  switch (region) {
    case 'kanto':
      startId = 1;
      endId = 151;
      break;
    case 'johto':
      startId = 152;
      endId = 251;
      break;
    case 'hoenn':
      startId = 252;
      endId = 386;
      break;
    case 'sinnoh':
      startId = 387;
      endId = 493;
      break;
    case 'unova':
      startId = 494;
      endId = 649;
      break;
    case 'kalos':
      startId = 650;
      endId = 721;
      break;
    case 'alola':
      startId = 722;
      endId = 809;
      break;
    case 'galar':
      startId = 810;
      endId = 898;
      break;
    case 'paldea':
      startId = 899;
      endId = 1010;
      break;
    default:
      return;
  }

  // Add Pokemon IDs to the queue within the specified range
  for (let i = startId; i <= endId; i++) {
    pokemonQueue.push(i);
  }

  // Start processing the next Pokemon
  processNextPokemon();
}

// Function to fetch Pokemon data by ID
function getPokemon(chosenPoke) {
  $.get(`https://pokeapi.co/api/v2/pokemon/${chosenPoke}`, function(data) {
    const pokemonData = data;
    clearPokemon();
    buildPokeEntry(pokemonData);
    processNextPokemon();
  });
}

// Function to process the next Pokemon in the queue
function processNextPokemon() {
  if (pokemonQueue.length > 0) {
    const nextPokemon = pokemonQueue.shift();
    $.get(`https://pokeapi.co/api/v2/pokemon/${nextPokemon}`, function(data) {
      const pokemonData = data;
      buildPokeEntry(pokemonData);
      processNextPokemon();
    });
  }
}

// Function to build and display a Pokemon entry
function buildPokeEntry(obj) {
  const html = `
    <div class="pokemon">
      <img id="img" src="${obj.sprites.front_default}" alt="${obj.name}">
    `;
  pokeContainer.insertAdjacentHTML('beforeend', html);

  const pokemonEntry = pokeContainer.lastElementChild;
  pokemonEntry.addEventListener('click', function() {
    openPopup(obj);
  });
}

// Get DOM elements for the popup
const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const popupContent = document.getElementById('popupContent');

// Function to open the popup with Pokemon details
function openPopup(pokemonData) {
    console.log(pokemonData)
  const html = `
    <img id="bigPoke" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
    <p id="text">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
    <p id="text">Weight: ${pokemonData.weight} lb.</p>
    <p id="text">Height: ${pokemonData.height} in"</p>
    <p id="text">Type: ${pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)}</p>
  `;

  popupContent.innerHTML = html;
  popupContainer.style.display = 'block';
}

// Function to close the popup
function closePopupContainer() {
  popupContainer.style.display = 'none';
}

// Add a "click" event listener to close the popup
closePopup.addEventListener('click', closePopupContainer);
