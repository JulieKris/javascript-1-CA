let title;
let poster;
let year;
let genre;
let description;
let price;

async function fetchFilm() {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/square-eyes/4696b9e6-ec6e-4672-a08d-3e3212a215c8"
    );
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
    errorMessage.innerText = "Something went wrong.";
    document.querySelector("#film-information").appendChild(errorMessage);
  }
}

function renderFilmInfo() {
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

function buttonText() {
  if (localStorage.getItem("godzilla") === null) {
    document.querySelector("#add-to-cart").innerText = "Add to cart";
  }
  if (localStorage.getItem("godzilla") !== null) {
    document.querySelector("#add-to-cart").innerText = "Remove from cart";
  }
}

function addToCart() {
  let godzilla = {
    title: title,
    poster: poster,
    price: price,
  };

  if (document.querySelector("#add-to-cart").innerText === "Add to cart") {
    localStorage.setItem("godzilla", JSON.stringify(godzilla));
    document.querySelector("#add-to-cart").innerText = "Remove from cart";
    document.querySelector("#item-count").innerText = localStorage.length;
  } else {
    localStorage.removeItem("godzilla");
    document.querySelector("#add-to-cart").innerText = "Add to cart";
    document.querySelector("#item-count").innerText = localStorage.length;
  }
}

fetchFilm();

document.querySelector("#item-count").innerText = localStorage.length;
