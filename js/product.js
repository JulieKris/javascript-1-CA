import loading from "./loading.mjs";

let title;
let poster;
let year;
let genre;
let description;
let price;
let id;

const apiUrl = "https://v2.api.noroff.dev/square-eyes";

async function fetchFilm() {
  loading.show();
  try {
    const params = new URLSearchParams(window.location.search);
    id = params.get("id");
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();

    title = data.data.title;
    poster = data.data.image.url;
    year = data.data.released;
    genre = data.data.genre;
    description = data.data.description;
    price = data.data.price;

    renderFilmInfo();
    buttonText();
    document.querySelector("#add-to-cart").addEventListener("click", addToCart);
  } catch (error) {
    console.error("Error fetching films:", error);
    const errorMessage = document.createElement("p");
    errorMessage.className = "product-error";
    errorMessage.innerText = "Something went wrong, couldn't get film.";
    document.querySelector("#film-information").appendChild(errorMessage);
  } finally {
    loading.hide();
  }
}

function renderFilmInfo() {
  document.title = title + " | Square Eyes";

  const filmPoster = document.createElement("img");
  filmPoster.setAttribute("src", poster);
  document.querySelector("#film-poster").appendChild(filmPoster);

  const filmTitle = document.createElement("h1");
  const filmTitleContent = document.createTextNode(title);
  filmTitle.appendChild(filmTitleContent);
  document.querySelector("#film-information").appendChild(filmTitle);

  const categoryDiv = document.createElement("div");
  document.querySelector("#film-information").appendChild(categoryDiv);
  categoryDiv.className = "year-genre";
  const releaseYear = document.createElement("p");
  const releaseYearContent = document.createTextNode(year);
  releaseYear.appendChild(releaseYearContent);
  categoryDiv.appendChild(releaseYear);

  const filmGenre = document.createElement("p");
  const filmGenreContent = document.createTextNode("Genre: " + genre);
  filmGenre.appendChild(filmGenreContent);
  categoryDiv.appendChild(filmGenre);

  const filmDescription = document.createElement("p");
  filmDescription.className = "film-description";
  const filmDescriptionContent = document.createTextNode(description);
  filmDescription.appendChild(filmDescriptionContent);
  document.querySelector("#film-information").appendChild(filmDescription);

  const productDividingLine = document.createElement("hr");
  document.querySelector("#film-information").appendChild(productDividingLine);

  const priceDiv = document.createElement("div");
  document.querySelector("#film-information").appendChild(priceDiv);
  priceDiv.className = "price-button";
  const filmPrice = document.createElement("p");
  const filmPriceContent = document.createTextNode(price + " NOK");
  filmPrice.appendChild(filmPriceContent);
  priceDiv.appendChild(filmPrice);
  const addToCartButton = document.createElement("button");
  addToCartButton.id = "add-to-cart";
  addToCartButton.innerText = "Add to cart";
  priceDiv.appendChild(addToCartButton);
}

//changes the text on add to cart button when clicked to remove
function buttonText() {
  if (
    JSON.parse(localStorage.getItem("cart")).some((e) => e.title === title) ===
    false
  ) {
    document.querySelector("#add-to-cart").innerText = "Add to cart";
  } else {
    document.querySelector("#add-to-cart").innerText = "Remove from cart";
  }
}

//stores film in storage or removes it if it is in storage
function addToCart() {
  let store = {
    title: title,
    poster: poster,
    price: price,
    id: id,
  };

  if (document.querySelector("#add-to-cart").innerText === "Add to cart") {
    let updatedCart = JSON.parse(localStorage.getItem("cart"));
    updatedCart.push(store);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    document.querySelector("#add-to-cart").innerText = "Remove from cart";
    document.querySelector("#item-count").innerText = JSON.parse(
      localStorage.getItem("cart")
    ).length;
  } else {
    // remove film from storage
    let updatedCart = JSON.parse(localStorage.getItem("cart"));
    updatedCart = updatedCart.filter((cart) => cart.title != title);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    document.querySelector("#add-to-cart").innerText = "Add to cart";
    document.querySelector("#item-count").innerText = JSON.parse(
      localStorage.getItem("cart")
    ).length;
  }
}

fetchFilm();

document.querySelector("#item-count").innerText = JSON.parse(
  localStorage.getItem("cart")
).length;
