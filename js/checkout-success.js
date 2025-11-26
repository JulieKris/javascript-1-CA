let filmsInStorage = JSON.parse(localStorage.getItem("cart"));

//fix checkout
function checkoutSuccess() {
  document.querySelector("#thanks").innerText =
    "Thank you very much for watching films with us, " +
    sessionStorage.getItem("name") +
    "!\nHere are the films you purchased.";

  filmsInStorage.forEach((film) => {
    const anchor = document.createElement("a");
    anchor.href = `product.html?id=${film.id}`;
    document.querySelector("#purchased-films").appendChild(anchor);

    const filmPoster = document.createElement("img");
    filmPoster.setAttribute("src", film.poster);
    anchor.appendChild(filmPoster);
  });

  localStorage.setItem("cart", "[]");
}

checkoutSuccess();
