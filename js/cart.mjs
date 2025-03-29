import loading from "./loading.mjs";

let filmsInStorage;
let price = [];

function renderCartItems(key) {
  loading.show();
  try {
    if (localStorage.length !== 0) {
      // if there's items in storage
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "cart-column-names";
      document.querySelector("#cart").appendChild(categoryDiv);

      const posterColumn = document.createElement("h3");
      posterColumn.className = "column-name1";
      categoryDiv.appendChild(posterColumn);
      const titleColumn = document.createElement("h3");
      titleColumn.innerText = "Title";
      titleColumn.className = "column-name2";
      categoryDiv.appendChild(titleColumn);
      const priceColumn = document.createElement("h3");
      priceColumn.innerText = "Price";
      priceColumn.className = "column-name3";
      categoryDiv.appendChild(priceColumn);

      const dividingLine = document.createElement("hr");
      document.querySelector("#cart").appendChild(dividingLine);
    } else {
      const emptyCartText = document.createElement("p");
      emptyCartText.innerText = "Your cart is currently empty.";
      emptyCartText.className = "empty-cart-text";
      document.querySelector("#cart").appendChild(emptyCartText);
      const emptyCartDividingLine = document.createElement("hr");
      document.querySelector("#cart").appendChild(emptyCartDividingLine);
    }

    for (let i = 0; i < localStorage.length; i++) {
      // for every item in storage
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
      filmTitle.className = "cart-film-title";
      filmTitle.innerText = filmsInStorage.title;
      film.appendChild(filmTitle);

      const filmPrice = document.createElement("p");
      filmPrice.className = "cart-film-price";
      filmPrice.innerText = filmsInStorage.price + " NOK";
      film.appendChild(filmPrice);

      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      film.appendChild(removeButton);

      removeButton.addEventListener("click", removeFilm);

      function removeFilm() {
        // remove item from storage
        localStorage.removeItem(localStorage.key(i));
        location.reload();
      }

      const cartDividingLine = document.createElement("hr");
      document.querySelector("#cart").appendChild(cartDividingLine);
    }
  } catch (error) {
    const cartError = document.createElement("p");
    cartError.innerText = "Something went wrong, couldn't get cart items.";
    cartError.className = "empty-cart-text";
    document.querySelector("#cart").appendChild(cartError);
    const cartDividingLine = document.createElement("hr");
    document.querySelector("#cart").appendChild(cartDividingLine);
  } finally {
    loading.hide();
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
  cartTotal.className = "cart-total";
  document.querySelector("#cart").appendChild(cartTotal);
  const totalText = document.createElement("p");
  totalText.innerText = "Total: ";
  cartTotal.appendChild(totalText);
  const cartTotalSum = document.createElement("p");
  cartTotalSum.innerText = totalPriceRounded + " NOK";
  cartTotal.appendChild(cartTotalSum);
}

renderCartTotal();

const form = document.getElementById("checkout-form");

form.addEventListener("submit", (e) => {
  let name = document.getElementById("name");
  let cardNumber = document.getElementById("card-number");
  let cvvCvc = document.getElementById("cvv-cvc");
  let expirationDate = document.getElementById("expiration-date");

  if (name.value === "") {
    document.querySelector("#name-error").innerText = "Name is required";
    e.preventDefault();
  } else {
    document.querySelector("#name-error").innerText = "";
    sessionStorage.setItem("name", name.value);
  }

  if (cardNumber.value === "") {
    document.querySelector("#card-number-error").innerText =
      "Card number is required";
    e.preventDefault();
  } else if (cardNumber.value.length < 11) {
    document.querySelector("#card-number-error").innerText =
      "Card number must be 11 digits";
    e.preventDefault();
  } else if (cardNumber.value.length > 11) {
    document.querySelector("#card-number-error").innerText =
      "Card number must be 11 digits";
    e.preventDefault();
  } else {
    document.querySelector("#card-number-error").innerText = "";
  }

  if (expirationDate.value === "") {
    document.querySelector("#expiration-date-error").innerText =
      "Expiration date is required";
    e.preventDefault();
  } else {
    document.querySelector("#expiration-date-error").innerText = "";
  }

  if (cvvCvc.value === "") {
    document.querySelector("#cvv-cvc-error").innerText = "CVV/CVC is required";
    e.preventDefault();
  } else if (cvvCvc.value.length < 3) {
    document.querySelector("#cvv-cvc-error").innerText =
      "CVV/CVC must be 3 digits";
    e.preventDefault();
  } else if (cvvCvc.value.length > 3) {
    document.querySelector("#cvv-cvc-error").innerText =
      "CVV/CVC must be 3 digits";
    e.preventDefault();
  } else {
    document.querySelector("#cvv-cvc-error").innerText = "";
  }
});

document.querySelector("#item-count").innerText = localStorage.length;
