function renderFilmInfo() {
  console.log("import works");
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

export { renderFilmInfo };
