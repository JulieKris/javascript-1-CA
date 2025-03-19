let allFilms = [];
let unfilteredFilmGenres = [];
let filmGenres = [];

const apiUrl = "https://v2.api.noroff.dev/square-eyes";

async function fetchFilms() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    allFilms = data.data;

    renderFilms(allFilms);
    createGenreSelect(filmGenres);
    filterFilmsByGenre();
  } catch (error) {
    console.error("Error fetching films:", error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Something went wrong.";
    document.querySelector("#film-container").appendChild(errorMessage);
  }
}

function genreSelect(genres) {
  filmGenres.push(...new Set(unfilteredFilmGenres)); //removes duplicate genres
  const genreOptionAll = document.createElement("option");
  genreOptionAll.setAttribute("value", "All");
  genreOptionAll.innerText = "Genre";
  document.querySelector("#genre-select").appendChild(genreOptionAll);

  genres.forEach((genre) => {
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

    const list = document.querySelectorAll(".film-card");
    for (const element of list) {
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
