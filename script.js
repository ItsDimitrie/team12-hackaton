document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.getElementById("homeBtn");
  const aboutBtn = document.getElementById("aboutBtn");
  const contactBtn = document.getElementById("contactBtn");
  const pokeBtn = document.getElementById("pokeBtn");

  const homeView = document.getElementById("homeView");
  const aboutView = document.getElementById("aboutView");
  const contactView = document.getElementById("contactView");
  const pokeView = document.getElementById("pokeView");

  homeBtn.addEventListener("click", function () {
    showView("home");
  });

  aboutBtn.addEventListener("click", function () {
    showView("about");
  });

  contactBtn.addEventListener("click", function () {
    showView("contact");
  });

  pokeBtn.addEventListener("click", function () {
    showView("poke");
  });

  function showView(view) {
    homeView.classList.remove("active");
    aboutView.classList.remove("active");
    contactView.classList.remove("active");
    pokeView.classList.remove("active");

    if (view === "home") {
      homeView.classList.add("active");
    } else if (view === "about") {
      aboutView.classList.add("active");
    } else if (view === "contact") {
      contactView.classList.add("active");
    } else if (view === "poke") {
      pokeView.classList.add("active");
    }
  }
});

// Define the pokemonTeam array outside the fetchPokemonData function
const pokemonTeam = [];



// Function to fetch Pokemon data
function fetchPokemonData(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      return response.json();
    })
    .then((data) => {
      // Process the received data
      pokemonTeam.push(data);
      displayPokemonTeam();
    })
    .catch((error) => {
      // Handle any errors that happened during the API request
      displayError(error.message);
    });
}

// Function to display the Pokemon team data on the screen
function displayPokemonTeam() {
  const pokemonData = document.getElementById("pokemonData");
  pokemonData.innerHTML = ""; // Clear the existing data

  for (let i = 0; i < pokemonTeam.length; i++) {
    const pokemon = pokemonTeam[i];
    const pokemonName = pokemon.name;

    // Extract the IVs as separate constants
    const hp = getPokemonStat("hp", pokemon);
    const attack = getPokemonStat("attack", pokemon);
    const specialAttack = getPokemonStat("special-attack", pokemon);
    const defense = getPokemonStat("defense", pokemon);
    const specialDefense = getPokemonStat("special-defense", pokemon);
    const speed = getPokemonStat("speed", pokemon);

    const pokemonElement = document.createElement("p");
    pokemonElement.textContent = `${pokemonName} - IVs: HP:${hp}, Attack:${attack}, Special Attack:${specialAttack}, Defense:${defense}, Special Defense:${specialDefense}, Speed:${speed}`;
    pokemonData.appendChild(pokemonElement);

    console.log(pokemonTeam)
  }
}

function getPokemonStat(statName, pokemon) {
  return pokemon.stats.find((stat) => stat.stat.name === statName)
    .base_stat;
}

// Function to display the error message on the screen
function displayError(errorMessage) {
  const pokemonData = document.getElementById("pokemonData");
  pokemonData.innerHTML = `<p>${errorMessage}</p>`;
}

// Event listener for the submit button
document.getElementById("submitBtn").addEventListener("click", () => {
  const pokemonInput = document.getElementById("pokemonInput");
  const pokemonName = pokemonInput.value.trim().toLowerCase();

  if (pokemonName) {
    fetchPokemonData(pokemonName);
  } else {
    // Display an error message or handle empty input
    displayError("Please enter a valid Pokemon name.");
  }
});
