let allFilms = [];
let unfilteredFilmGenres = [];
let filmGenres = [];

async function fetchFilms() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/square-eyes");
    const data = await response.json();

    allFilms = data.data;

    renderFilms(allFilms);
    createGenreSelect(filmGenres);
    filterFilmsByGenre();
  } catch (error) {
    console.error("Error fetching films:", error);
  }
}

function renderFilms(films) {
  films.forEach((film) => {
    unfilteredFilmGenres.push(film.genre);

    let filmUrl = film.title;
    filmUrl = filmUrl.split(":").join("");
    filmUrl = filmUrl.split("&").join("and");
    filmUrl = filmUrl.split(" ").join("-");
    filmUrl = "/" + filmUrl.toLowerCase() + ".html";

    const filmCard = document.createElement("div");
    filmCard.id = "film-card";
    filmCard.className = "film-card";

    const imgLink = document.createElement("a");
    imgLink.setAttribute("href", filmUrl);
    filmCard.appendChild(imgLink);
    const poster = document.createElement("img");
    poster.setAttribute("src", film.image.url);
    imgLink.appendChild(poster);

    const title = document.createElement("a");
    title.setAttribute("href", filmUrl);
    title.textContent = film.title;
    filmCard.appendChild(title);

    document.querySelector("#film-container").appendChild(filmCard);
  });
}

function createGenreSelect(genres) {
  filmGenres.push(...new Set(unfilteredFilmGenres)); //removes duplicate genres
  const genreOptionAll = document.createElement("option");
  genreOptionAll.setAttribute("value", "All");
  genreOptionAll.innerText = "All";
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

document.querySelector("#item-count").innerText = localStorage.length;
