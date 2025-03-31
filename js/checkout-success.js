document.querySelector("#item-count").innerText = localStorage.length;

let filmsInStorage;

document.querySelector("#thanks").innerText =
  "Thank you very much for watching films with us, " +
  sessionStorage.getItem("name") +
  "!\nHere are the films you purchased.";

function purchasedFilms() {
  for (let i = 0; i < localStorage.length; i++) {
    // for every item in storage
    filmsInStorage = localStorage.getItem(localStorage.key(i));
    filmsInStorage = JSON.parse(filmsInStorage);

    const anchor = document.createElement("a");
    anchor.href = `product.html?id=${filmsInStorage.id}`;
    document.querySelector("#purchased-films").appendChild(anchor);

    const filmPoster = document.createElement("img");
    filmPoster.setAttribute("src", filmsInStorage.poster);
    anchor.appendChild(filmPoster);
  }
  localStorage.clear();
  sessionStorage.clear();
}

purchasedFilms();
