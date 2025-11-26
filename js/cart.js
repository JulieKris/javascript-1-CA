import loading from "./loading.mjs";

let filmsInStorage;
let price = [];
let cartItems = JSON.parse(localStorage.getItem("cart"));

//deactivate checkout if cart is empty
function deactivateCheckout() {
  if (JSON.parse(localStorage.getItem("cart")).length === 0) {
    document.querySelector("#name").disabled = true;
    document.querySelector("#card-number").disabled = true;
    document.querySelector("#expiration-date").disabled = true;
    document.querySelector("#cvv-cvc").disabled = true;
    document.querySelector("#checkout-button").disabled = true;

    document.querySelector("#forms").style.opacity = "0.6";
  }
}

deactivateCheckout();

function renderCartItems() {
  loading.show();
  try {
    if (JSON.parse(localStorage.getItem("cart")).length !== 0) {
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

    //fix cart display
    // for every item in storage
    cartItems.forEach((item) => {
      filmsInStorage = JSON.parse(localStorage.getItem("cart"));

      price.push(item.price);

      const film = document.createElement("div");
      film.className = "cart-item";
      document.querySelector("#cart").appendChild(film);

      const anchor = document.createElement("a");
      anchor.href = `product.html?id=${item.id}`;
      film.appendChild(anchor);

      const filmPoster = document.createElement("img");
      filmPoster.setAttribute("src", item.poster);
      anchor.appendChild(filmPoster);

      const filmTitle = document.createElement("p");
      filmTitle.className = "cart-film-title";
      filmTitle.innerText = item.title;
      film.appendChild(filmTitle);

      const filmPrice = document.createElement("p");
      filmPrice.className = "cart-film-price";
      filmPrice.innerText = item.price + " NOK";
      film.appendChild(filmPrice);

      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      film.appendChild(removeButton);

      const cartDividingLine = document.createElement("hr");
      document.querySelector("#cart").appendChild(cartDividingLine);

      removeButton.addEventListener("click", removeFilm);

      // remove item from cart and storage
      function removeFilm() {
        film.remove();
        cartDividingLine.remove();

        let updatedCart = JSON.parse(localStorage.getItem("cart"));
        updatedCart = updatedCart.filter((cart) => cart.title != item.title);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        document.querySelector("#add-to-cart").innerText = "Add to cart";
        document.querySelector("#item-count").innerText = JSON.parse(
          localStorage.getItem("cart")
        ).length;
      }
    });
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
  e.preventDefault();

  //if every form input is valid
  if (
    name.value !== "" &&
    cardNumber.value !== "" &&
    expirationDate.value !== "" &&
    cvvCvc.value !== "" &&
    cardNumber.value.length === 16 &&
    cvvCvc.value.length === 3 &&
    !isNaN(cardNumber.value) &&
    !isNaN(cvvCvc.value)
  ) {
    window.location.href = "checkout-success.html";
    sessionStorage.setItem("name", name.value);
    //check individual form input
  } else {
    if (name.value === "") {
      document.querySelector("#name-error").innerText = "Name is required";
    } else {
      document.querySelector("#name-error").innerText = "";
    }

    if (cardNumber.value === "") {
      document.querySelector("#card-number-error").innerText =
        "Card number is required";
    } else if (cardNumber.value.length !== 16) {
      document.querySelector("#card-number-error").innerText =
        "Card number must be 16 digits";
    } else if (isNaN(cardNumber.value)) {
      document.querySelector("#card-number-error").innerText =
        "Card number must be a number";
    } else {
      document.querySelector("#card-number-error").innerText = "";
    }

    if (expirationDate.value === "") {
      document.querySelector("#expiration-date-error").innerText =
        "Expiration date is required";
    } else {
      document.querySelector("#expiration-date-error").innerText = "";
    }

    if (cvvCvc.value === "") {
      document.querySelector("#cvv-cvc-error").innerText =
        "CVV/CVC is required";
    } else if (cvvCvc.value.length !== 3) {
      document.querySelector("#cvv-cvc-error").innerText =
        "CVV/CVC must be 3 digits";
    } else if (isNaN(cvvCvc.value)) {
      document.querySelector("#cvv-cvc-error").innerText =
        "CVV/CVC must be a number";
    } else {
      document.querySelector("#cvv-cvc-error").innerText = "";
    }
  }
});

document.querySelector("#item-count").innerText = JSON.parse(
  localStorage.getItem("cart")
).length;
