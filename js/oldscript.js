// array of filmIDs get added to fetch API url
// then get information needed for display on frontpage: title, poster, genre, link to product page.

const apiUrl = "https://v2.api.noroff.dev/square-eyes/";

const filmIDs = [
  "04fd79ad-2612-4dab-b2ee-1320c4e5ccd1",
  "352ba432-5b5d-4ccc-9aba-f2704c500cf3",
  "4696b9e6-ec6e-4672-a08d-3e3212a215c8",
  "581f13b2-3ca4-494e-be7c-bb51fbc320f4",
  "6c8fbbac-b0b7-42d9-a01b-cce95c99bdee",
  "972df6d3-b4e8-44c1-9dec-cadd3b35102e",
  "a7e81b82-d2e5-4288-b700-889186a7da0e",
  "a969a4b4-a4d0-4dd5-99e5-86ae0a8eee43",
  "ad063e58-bc89-46bf-ac45-16760bc883c7",
  "b9e4edb1-e798-45e3-9c46-f7cd75b9326f",
  "d5c5c3e0-07da-406a-b3db-8336c40c5ae7",
  "f40421d4-0977-4a78-8e47-bacd7a188381",
];

const getApiUrls = filmIDs.map((x) => apiUrl + x);

//fetching the data from the api and creating the html elements for the frontpage.
// I feel like this code should be divided up, but I wasn't sure how to do it.
getApiUrls.forEach(async (filmID) => {
  const response = await fetch(filmID);
  const data = await response.json();

  const filmPosterUrl = await data.data.image.url;
  console.log(filmPosterUrl);

  const filmTitle = await data.data.title;
  console.log(filmTitle);

  let filmUrl;
  filmUrl = filmTitle.split(":").join("");
  filmUrl = filmUrl.split("&").join("and");
  filmUrl = filmUrl.split(" ").join("-");
  filmUrl = "/" + filmUrl.toLowerCase() + ".html";

  function addFilms() {
    // the div that contains the films poster and title which then gets appended to the films div in the html document.
    const newDiv = document.createElement("div");
    newDiv.className = "filmpostertitle";
    document.getElementById("films").appendChild(newDiv);

    const addFilmPosterUrl = document.createElement("a");
    addFilmPosterUrl.setAttribute("href", filmUrl);
    newDiv.appendChild(addFilmPosterUrl);

    //add the poster of the film and append it to an a tag that links to its product page.
    const addFilmPoster = document.createElement("img");
    addFilmPoster.setAttribute("src", filmPosterUrl);
    addFilmPosterUrl.appendChild(addFilmPoster);

    //add the title of the film below the poster that is also a link which links to its product page.
    const addFilmTitle = document.createElement("a");
    addFilmTitle.setAttribute("href", filmUrl);
    const createFilmTitle = document.createTextNode(filmTitle);
    addFilmTitle.appendChild(createFilmTitle);
    newDiv.appendChild(addFilmTitle);
  }
  addFilms();

  // genre filter
});

console.log(filmIDs);
