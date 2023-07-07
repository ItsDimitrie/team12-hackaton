// Import the chart script
import { createGraph } from './chart-script.js';

// Define the array that holds the team of the user
let pokemonTeam = [];
let currentPokemon = {};

/**
 * Fetch a Pokémon by name using the PokéAPI
 * @param {string} pokemonName The name of the Pokemon to fetch
 */
function fetchPokemonData(pokemonName) {
  // Define the URL that will be used to fetch the data
  const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;

  // Fetch the data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => diplayPokemon(data))
}

/**
 * Display the Pokemon data on the screen
 * @param {object} pokemon The Pokemon data to display
 */
function diplayPokemon(pokemonData) {
  // Get the data from the Pokemon
  currentPokemon = pokemonData;
  const pokemonStats = getPokemonStats(currentPokemon);

  // Create the image
  const image = document.getElementById('image');
  const pokemonImage = document.createElement('img');
  pokemonImage.src = currentPokemon.sprites.front_default;
  pokemonImage.alt = pokemonStats.name;
  image.innerHTML = "";
  image.appendChild(pokemonImage);

  // Set the stats
  document.getElementById('pokemonName').textContent = pokemonStats.name;
  document.getElementById('pokemonType').textContent = pokemonStats.types;
  document.getElementById('pokemonHP').textContent = "HP: " + pokemonStats.hp;
  document.getElementById('pokemonAttack').textContent = "Attack: " + pokemonStats.attack;
  document.getElementById('pokemonSAttack').textContent = "Special Attack: " + pokemonStats.specialAttack;
  document.getElementById('pokemonDefense').textContent = "Defense: " + pokemonStats.defense;
  document.getElementById('pokemonSDefense').textContent = "Special Defense: " + pokemonStats.specialDefense;
  document.getElementById('pokemonSpeed').textContent = "Speed: " + pokemonStats.speed;

  // Unlock the save button
  document.getElementById('add-button').hidden = false;
}

/**
 * Get the value of a stat from the Pokemon data
 * @param {string} statName The name of the stat to get
 * @param {object} pokemonData The Pokemon data to get the stat from
 * @returns {string|undefined} The stat value
 */
function getPokemonStat(statName, pokemonData) {
  return pokemonData.stats.find((stat) => stat.stat.name === statName).base_stat;
}

/**
 * Get the stats of a Pokemon
 * This includes types, HP, Attack, Special Attack, Defense, Special Defense, and Speed
 * @param {object} pokemonData The Pokemon data to get the stats from
 * @returns {object} The stats of the Pokemon
 */
function getPokemonStats(pokemonData) {
  return {
    "name": pokemonData.name.toUpperCase(),
    "types": pokemonData.types.map((type) => type.type.name).join("/").toUpperCase(),
    "hp": getPokemonStat("hp", pokemonData),
    "attack": getPokemonStat("attack", pokemonData),
    "specialAttack": getPokemonStat("special-attack", pokemonData),
    "defense": getPokemonStat("defense", pokemonData),
    "specialDefense": getPokemonStat("special-defense", pokemonData),
    "speed": getPokemonStat("speed", pokemonData),
  };
}

/** Save the current Pokemon to the team */
function savePokemon() {
  // Check if the team is full
  if (pokemonTeam.length >= 6) {
    alert("You already have 6 Pokemon in your team!");
    return;
  }

  // Check if the Pokemon is already in the team
  if (pokemonTeam.find((pokemon) => pokemon.name === currentPokemon.name)) {
    alert("You already have this Pokemon in your team!");
    return;
  }

  // Add the Pokemon to the team
  pokemonTeam.push(currentPokemon);
  updateStatsGraph();
  updateTeamList();
  getSuggestions();
}

/** Get the Pokemon from the API */
function getPokemon() {
  // Get the name of the Pokemon to search for
  const pokemonName =  document.getElementById("search-name").value.trim().toLowerCase();

  // If the name is not empty, fetch the Pokemon data
  if (pokemonName) {
    fetchPokemonData(pokemonName);
  }
}

/** Update the stats graph */
function updateStatsGraph() {
  // Prepare the pokemon stats
  const pokemonStats = pokemonTeam.map((pokemon) => getPokemonStats(pokemon));

  // Clear the previous graph by returning the HTML to its initial state
  document.getElementById('chart').innerHTML = '<apexchart type="line" height="800" width="1300" :options="chartOptions" :series="series"></apexchart>'

  // Create the graph when there are pokemon in the team
  createGraph(pokemonStats);
}

// Create events for the search button
document.getElementById("search-button").onclick = getPokemon;
document.getElementById("search-name").addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 'Return') {
    getPokemon();
  }
});

/** Update the team list */
function updateTeamList() {
  // Clear the team
  document.getElementById('team-members').innerHTML = "";

  // Update the teams
  pokemonTeam.forEach((pokemon) => {
    // Get the stats from the pokemon
    const pokemonStats = getPokemonStats(pokemon);

    // Create the team member
    const teamMember = document.createElement('div');
    teamMember.classList.add('team-member');

    // Create the image
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemonStats.name;
    pokemonImage.classList.add('team-image');
    pokemonImage.onclick = () => removePokemon(pokemon.name);

    // Create the title
    const pokemonTitle = document.createElement('h1');
    pokemonTitle.textContent = pokemonStats.name;
    pokemonTitle.classList.add('team-title');

    // Create the type list
    const pokemonTypes = document.createElement('h2');
    pokemonTypes.textContent = pokemonStats.types;
    pokemonTypes.classList.add('team-types');

    // Create the stat list
    const pokemonStatList = document.createElement('h3');
    pokemonStatList.textContent = "HP: " + pokemonStats.hp + " | Attack: " + pokemonStats.attack + " | Special Attack: " + pokemonStats.specialAttack + " | Defense: " + pokemonStats.defense + " | Special Defense: " + pokemonStats.specialDefense + " | Speed: " + pokemonStats.speed;
    pokemonStatList.classList.add('team-stats');

    // Add the image and the titles
    teamMember.appendChild(pokemonImage);
    teamMember.appendChild(pokemonTitle);
    teamMember.appendChild(pokemonTypes);
    teamMember.appendChild(pokemonStatList);

    // Add the member to the team
    document.getElementById('team-members').appendChild(teamMember);
  });
}

/** 
 * Remove a Pokemon from the team 
 * @param {string} pokemonName The name of the Pokemon to remove
 */
function removePokemon(pokemonName) {
  // Remove the Pokemon from the team
  pokemonTeam = pokemonTeam.filter((pokemon) => pokemon.name !== pokemonName);
  updateStatsGraph();
  updateTeamList();
  getSuggestions();
}

/** Get suggestions from the API */
function getSuggestions() {
  if (pokemonTeam.length > 0) {
    const message = 'Hello, can you give me some recommendations for my team? I have ' + pokemonTeam.map((pokemon) => pokemon.name).join(', ') + '.';
    const url = 'https://api.openai.com/v1/chat/completions';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      },
      body: JSON.stringify({
        messages: [{ 'content': message, 'role': 'user' }],
        model: 'gpt-3.5-turbo',
        n: 1
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById('recommendation').innerHTML = data.choices[0].message.content;
      });
  }
}

// Create events for the save button
document.getElementById("add-button").onclick = savePokemon;