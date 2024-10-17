// Mantém o controle do deslocamento atual na lista de Pokémon.
let offset = 0;
// Especifica o número de Pokémon para carregar de uma vez.
const limit = 15;
// Uma flag indicando se os dados estão sendo carregados no momento.
let isLoading = false;
//Uma flag indicando se uma operação de pesquisa está ativa.
let isSearchActive = false;

//Busca dados para todos os Pokémon e cria cartões para cada um.

async function loadAllPokemon() {
  try {
    if (isLoading || isSearchActive) return;
    isLoading = true;

    await new Promise(resolve => setTimeout(resolve, 2000));

    await new Promise(resolve => requestAnimationFrame(resolve));

    const totalPokemon = 706;

    for (let i = offset + 1; i <= totalPokemon; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      const gifUrl = `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${i}.gif`;

      try {
        const getPokemonData = await fetch(url);
        const pokemon = await getPokemonData.json();

        if (!document.querySelector(`#pokemon-${pokemon.id}`)) {
          card(pokemon, gifUrl);
        }
      } catch (error) {
        console.error(error);
      }
    }

    offset = totalPokemon;
  } finally {
    isLoading = false;
  }
}




async function getPokemon() {
  if (isLoading || isSearchActive) return;
  isLoading = true;

  for (let i = offset + 1; i <= offset + limit && i <= 706; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    const gifUrl = `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${i}.gif`;

    try {
      const getPokemonData = await fetch(url);
      const pokemon = await getPokemonData.json();

      if (!document.querySelector(`#pokemon-${pokemon.id}`)) {
        card(pokemon, gifUrl);
      }
    } catch (error) {
      console.error(error);
    }
  }

  offset += limit;
  isLoading = false;
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
     getPokemon();
  }
});

getPokemon();

function card(pokemon, imageUrl) {
  const pokemonContainer= document.getElementsByClassName("pokemon-container")[0];
  const ul = document.createElement("ul");
  ul.className = "card";
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.className = "pokemon-image";
  const p = document.createElement("h3");
  const id = document.createElement("p");
  const divTypes = document.createElement("div");
  divTypes.classList.add("divType");

  img.src = imageUrl;
  p.innerText = pokemon.name;
  id.innerText = `#${pokemon.id}`;

  li.appendChild(img);
  li.appendChild(id);
  li.appendChild(p);
  li.appendChild(divTypes);
  ul.appendChild(li);
  pokemonContainer.appendChild(ul);

  const pokeTypes = pokemon.types;
  pokeTypes.forEach((object) => {
    const p = document.createElement("p");
    p.className = object.type.name;
    p.innerText = object.type.name;
    divTypes.appendChild(p);
  });
}

function openModal(pokemonName) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const modalTypes = document.createElement("div");
  modalTypes.classList.add("modal-types");
  const modalStats = document.createElement("div");
  modalStats.classList.add("modal-stats");

  const modalText = document.createElement("p");
  modalText.classList.add("modal-text")
  modalText.textContent = `Você clicou em ${pokemonName}`;

  const closeModalButton = document.createElement("button");
  closeModalButton.textContent = "Fechar";
  closeModalButton.classList.add("close-modal-button");
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalContent.appendChild(modalStats);
  modalContent.appendChild(modalTypes);
  modalContent.appendChild(modalText);
  modalContent.appendChild(closeModalButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.style.display = "flex";
}

document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  const cardUL = clickedElement.closest('.card');
  if (cardUL) {
    const pokemonName = cardUL.querySelector("h3").innerText;
    openModal(pokemonName);
  }
});

function createBackToTopButton() {
  const body = document.body;
  const button = document.createElement("button");
  button.textContent = "Back to Top";
  button.classList.add("back-to-top-button");

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  body.appendChild(button);
}

createBackToTopButton();

function setFavicon(iconUrl) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = iconUrl;
  document.head.appendChild(link);
}

setFavicon('./assets/imgs/pokemon-icon.svg');

window.addEventListener('DOMContentLoaded', (event) => {
  createSearchBar();
});

function createSearchBar() {
  const header = document.querySelector('header');
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container')
  const searchInput = document.createElement('input');
  const loadAllButton = document.createElement('button');

  searchInput.setAttribute('id', 'pokemonSearchInput');
  searchInput.setAttribute('placeholder', 'Search Pokémon');

  loadAllButton.textContent = 'Load All Pokémon';
  loadAllButton.classList.add('load-all-pokemons-button');
  loadAllButton.addEventListener('click', loadAllPokemon);

  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(loadAllButton);
  header.appendChild(searchContainer);

  searchInput.addEventListener('input', filterPokemonsByName);
}

async function filterPokemonsByName() {
  isSearchActive = true;
  const searchInput = document.getElementById('pokemonSearchInput');
  const searchTerm = searchInput.value.toLowerCase();
  const pokemonContainers = document.querySelectorAll('.pokemon-container ul');

  pokemonContainers.forEach(container => {
    const pokemonName = container.querySelector('h3').textContent.toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      container.style.display = ''; // Exibir a ul correspondente à pesquisa
    } else {
      container.style.display = 'none'; // Ocultar as ul que não correspondem à pesquisa
    }
  });
}