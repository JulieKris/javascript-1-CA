function buttonText() {
  if (localStorage.getItem("mandalorian") === null) {
    document.querySelector("#add-to-cart").innerText = "Add to cart";
  }
  if (localStorage.getItem("mandalorian") !== null) {
    document.querySelector("#add-to-cart").innerText = "Remove from cart";
  }
}

function addToCart() {
  let mandalorian = {
    title: title,
    poster: poster,
    price: price,
  };

  if (document.querySelector("#add-to-cart").innerText === "Add to cart") {
    localStorage.setItem("mandalorian", JSON.stringify(mandalorian));
    document.querySelector("#add-to-cart").innerText = "Remove from cart";
    document.querySelector("#item-count").innerText = localStorage.length;
  } else {
    localStorage.removeItem("mandalorian");
    document.querySelector("#add-to-cart").innerText = "Add to cart";
    document.querySelector("#item-count").innerText = localStorage.length;
  }
}

export { buttonText, addToCart };
