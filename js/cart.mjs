let filmsInStorage;
let price = [];

function renderCartItems(key) {
  for (let i = 0; i < localStorage.length; i++) {
    filmsInStorage = localStorage.getItem(localStorage.key(i));
    filmsInStorage = JSON.parse(filmsInStorage);

    price.push(filmsInStorage.price);

    const film = document.createElement("div");
    film.className = "cart-item";
    document.querySelector("#cart").appendChild(film);

    const filmPoster = document.createElement("img");
    filmPoster.setAttribute("src", filmsInStorage.poster);
    film.appendChild(filmPoster);

    const filmTitle = document.createElement("p");
    filmTitle.innerText = filmsInStorage.title;
    film.appendChild(filmTitle);

    const filmPrice = document.createElement("p");
    filmPrice.innerText = filmsInStorage.price + " NOK";
    film.appendChild(filmPrice);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    film.appendChild(removeButton);

    removeButton.addEventListener("click", removeFilm);

    function removeFilm() {
      localStorage.removeItem(localStorage.key(i));
      location.reload();
    }
  }
}

renderCartItems();

function renderCartTotal() {
  const initialValue = 0;
  // adds up the total price of items in the cart
  const totalPrice = price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const totalPriceRounded = totalPrice.toFixed(2); // rounds the total number to two decimals

  const cartTotal = document.createElement("div");
  document.querySelector("#cart").appendChild(cartTotal);
  const totalText = document.createElement("p");
  totalText.innerText = "Total: ";
  cartTotal.appendChild(totalText);
  const cartTotalSum = document.createElement("p");
  cartTotalSum.innerText = totalPriceRounded + " NOK";
  cartTotal.appendChild(cartTotalSum);
}

renderCartTotal();

document.querySelector("#item-count").innerText = localStorage.length;
