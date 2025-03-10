let allFilms = [];

async function fetchFilms() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/square-eyes");
    const data = await response.json();
    allFilms = data.data; // Store in global variable

    renderFilms(allFilms); // Render films immediately after fetching
  } catch (error) {
    console.error("Error fetching films:", error);
  }
}

function renderFilms(films) {
  const filmContainer = document.querySelector("#film-container");

  films.forEach((film) => {
    const filmCard = document.createElement("div");
    const poster = document.createElement("img");
    poster.setAttribute("src", film.image.url);
    filmCard.appendChild(poster);
    const title = document.createElement("h3");
    title.textContent = film.title;
    filmCard.appendChild(title);
    filmContainer.appendChild(filmCard);
  });
}

function filterFilmsByGenre(genre) {
  if (genre === "all") {
    // Show all films
    renderFilms(allFilms);
  } else {
    // Filter films by genre
    const filteredFilms = allFilms.filter((film) => film.genre.includes(genre));
    renderFilms(filteredFilms);
  }
}

fetchFilms();

// Set up event listener for genre select
const genreSelect = document.querySelector("#genre-select");
genreSelect.addEventListener("change", () => {
  const selectedGenre = this.value;
  filterFilmsByGenre(selectedGenre);
});
