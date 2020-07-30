const form = document.querySelector("#autoform");
const inputField = document.querySelector("#inputField");
const submitBtn = document.querySelector(".formButton");
const results = document.querySelector("#poke-container");

let dataRes = {};
// Add a keyup event listener to our input element

inputField.addEventListener("keyup", (event) => {
  dataRes = {};
  // console.log(event.target);
  autocompleter(event);
  console.log(dataRes);
});

form.addEventListener("submit", (event) => {
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";
  event.preventDefault();
  console.log(inputField.value);

  fetchPokemonData(dataRes);
  inputField.innerText = "";
  getDeleteBtn().style.display = "block";
  getDeleteBtn().addEventListener("click", deleteEverything);
});

function getDeleteBtn() {
  return document.querySelector("#delete-btn");
}

function fetchPokemonData(pokemon) {
  console.log(pokemon.pokeUrl);
  let url = pokemon.pokeUrl;
  //Example: https://pokeapi.co/api/v2/pokemon/1/"
  let loader = document.querySelector(".loader");

  loader.innerHTML = `<img src='public/loader.gif'>`;
  fetch(url)
    .then((response) => response.json())
    .then((pokeData) => {
      console.log(
        "We inside fetchPokemonData annd the fetch got us:",
        pokeData
      );
      loader.innerHTML = "";
      renderPokemon(pokeData);
    })
    .catch((err) => {
      console.log("no such pokemon!");
      loader.innerHTML =
        `<img src='public/nores.gif'>` +
        `<div><p class="loader"> No Results found, maybe no such Pokemon exist?</p></div>`;
    });
}

function renderPokemon(pokeData) {
  let allPokemonContainer = document.getElementById("poke-container");
  let pokeContainer = document.createElement("div"); //div will be used to hold the data/details for indiviual pokemon.{}
  pokeContainer.classList.add("ui", "card");

  createPokeImage(pokeData.id, pokeContainer);

  let pokeName = document.createElement("h4");
  pokeName.innerText = pokeData.name;

  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `#${pokeData.id}`;

  let pokeTypes = document.createElement("ul"); //ul list will hold the pokemon types

  createTypes(pokeData.types, pokeTypes); // helper function to go through the types array and create li tags for each one

  pokeContainer.append(pokeName, pokeNumber, pokeTypes); //appending all details to the pokeContainer div
  allPokemonContainer.appendChild(pokeContainer); //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

function createTypes(types, ul) {
  types.forEach(function (type) {
    let typeLi = document.createElement("li");
    typeLi.innerText = type["type"]["name"];
    ul.append(typeLi);
  });
}

function createPokeImage(pokeID, containerDiv) {
  let pokeImgContainer = document.createElement("div");
  pokeImgContainer.classList.add("image");

  let pokeImage = document.createElement("img");
  pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;

  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

function deleteEverything(event) {
  event.target.style = "none";
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";
}

// Autocomplete for form
function autocompleter(event) {
  // retireve the input element
  const input = event.target;
  // retrieve the datalist element
  const listo = document.querySelector("#listo");

  // minimum number of characters before we start to generate suggestions
  const min_characters = 0;

  if (input.value.length < min_characters) {
    return;
  } else {
    fetch("/autocomplete", {
      method: "POST", // we want to send the server a data, and apply some logic to it
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input.value),
    })
      .then((response) => {
        if (response.ok) {
          // we should be getting a strignified json, convert it to json agfain and pass it on
          return response.json();
        }
      })
      .then((response) => {
        console.log("response: ", response);
        console.log("data:", input.value);

        dataRes = {
          pokeName: response[0]["name"],
          pokeUrl: response[0]["url"],
        };

        resultsArray = [...response];
        // clear any previously loaded options in the datalist
        listo.innerHTML = "";
        resultsArray.forEach((element) => {
          // Create a new <option> element.
          let option = document.createElement("option");
          option.value = element.name;

          // attach the option to the datalist element
          listo.appendChild(option);
        });
      });
  }
}
