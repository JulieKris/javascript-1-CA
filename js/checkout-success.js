let filmsInStorage;

function checkoutSuccess() {
  if (localStorage.length !== 0) {
    document.querySelector("#thanks").innerText =
      "Thank you very much for watching films with us, " +
      sessionStorage.getItem("name") +
      "!\nHere are the films you purchased.";

    for (let i = 0; i < localStorage.length; i++) {
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
  } else {
    document.querySelector("#thanks").innerText = "nothing here...";
  }
}

checkoutSuccess();
