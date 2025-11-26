import loading from "./loading.mjs";

let allFilms = [];
let unfilteredFilmGenres = [];
let filmGenres = [];

if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

async function fetchFilms() {
  loading.show();
  try {
    const response = await fetch("https://v2.api.noroff.dev/square-eyes");
    const data = await response.json();

    allFilms = data.data;

    renderFilms(allFilms);
    createGenreSelect(filmGenres);
    filterFilmsByGenre();
  } catch (error) {
    console.error("Error fetching films:", error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Something went wrong, couldn't get films.";
    document.querySelector("#film-container").appendChild(errorMessage);
  } finally {
    loading.hide();
  }
}

function renderFilms(films) {
  films.forEach((film) => {
    unfilteredFilmGenres.push(film.genre);

    const filmCard = document.createElement("div");
    filmCard.id = "film-card";
    filmCard.className = "film-card";

    const poster = document.createElement("img");
    poster.setAttribute("src", film.image.url);
    filmCard.appendChild(poster);

    const anchor = document.createElement("a");
    anchor.className = "product-link";

    anchor.href = `product.html?id=${film.id}`;

    const title = document.createElement("p");
    title.textContent = film.title;
    filmCard.appendChild(title);

    anchor.appendChild(filmCard);
    document.querySelector("#film-container").appendChild(anchor);
  });
}

function createGenreSelect(genres) {
  filmGenres.push(...new Set(unfilteredFilmGenres)); //removes duplicate genres
  //create select option for all genres
  const genreOptionAll = document.createElement("option");
  genreOptionAll.setAttribute("value", "All");
  genreOptionAll.innerText = "Genre";
  document.querySelector("#genre-select").appendChild(genreOptionAll);

  genres.forEach((genre) => {
    //create select option for each genre
    const genreOption = document.createElement("option");
    genreOption.setAttribute("value", genre);
    genreOption.id = "genre-option";
    const genreOptionText = document.createTextNode(genre);
    genreOption.appendChild(genreOptionText);
    document.querySelector("#genre-select").appendChild(genreOption);
  });
}

function filterFilmsByGenre() {
  const genreSelect = document.querySelector("#genre-select");
  genreSelect.addEventListener("change", () => {
    const selectedOption = genreSelect.options[genreSelect.selectedIndex];

    const list = document.querySelectorAll(".product-link");
    for (const element of list) {
      //remove previous renderedfilms when new option is selected
      element.remove();
    }

    if (selectedOption.value === "All") {
      // Show all films
      renderFilms(allFilms);
    } else {
      // Filter films by genre
      const filteredFilms = allFilms.filter((film) =>
        film.genre.includes(selectedOption.value)
      );
      renderFilms(filteredFilms);
    }
  });
}

fetchFilms();

document.querySelector("#item-count").innerText = JSON.parse(
  localStorage.getItem("cart")
).length;
