const inputValue = document.getElementById('search');
const pokeBtn = document.getElementById('btn');
const pokeContainer = document.getElementById('poke_container');
let pokemonQueue = [];

const pokeVideoContainer = document.getElementById('pokeVideoContainer');
const closePokeVideo = document.getElementById('closePokeVideo');

function openPokeVideo() {
  pokeVideoContainer.style.display = 'block';
}

function closePokeVideoContainer() {
  pokeVideoContainer.style.display = 'none';
}

window.addEventListener('load', openPokeVideo);

closePokeVideo.addEventListener('click', closePokeVideoContainer);

pokeBtn.addEventListener('click', function() {
  const chosenPoke = inputValue.value;
  getPokemon(chosenPoke);
});

function allPokemon() {
  for (let i = 1; i <= 1010; i++) {
    pokemonQueue.push(i);
  }
  processNextPokemon();
}

allPokemon();

function getPokemon(chosenPoke) {
  $.get(`https://pokeapi.co/api/v2/pokemon/${chosenPoke}`, function(data) {
    const pokemonData = data;
    buildPokeEntry(pokemonData);
    processNextPokemon();
  });
}

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

function buildPokeEntry(obj) {
  const html = `
    <div class="pokemon">
      <img id="img" src="${obj.sprites.front_default}" alt="${obj.name}">
      <p>${obj.name.charAt(0).toUpperCase() + obj.name.slice(1)}</p>
    `;
  pokeContainer.insertAdjacentHTML('beforeend', html);

  const pokemonEntry = pokeContainer.lastElementChild;
  pokemonEntry.addEventListener('click', function() {
    openPopup(obj);
  });
}

const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const popupContent = document.getElementById('popupContent');

function openPopup(pokemonData) {
  const html = `
    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
    <p>Name: ${pokemonData.name}</p>
    <p>Weight: ${pokemonData.weight} lb.</p>
    <p>Height: ${pokemonData.height} in"</p>
  `;

  popupContent.innerHTML = html;
  popupContainer.style.display = 'block';
}

function closePopupContainer() {
  popupContainer.style.display = 'none';
}

closePopup.addEventListener('click', closePopupContainer);
