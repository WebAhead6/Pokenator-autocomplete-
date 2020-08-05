const path = require("path");
const fs = require("fs");
const pokeBase = require("../data/poke.json");
const missingHandler = require("./missing");

function autoHandler(request, response) {
  let data = "";

  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      response.writeHead(200, {"content-type": "application/json"});

      let matches = pokeBase.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().indexOf(JSON.parse(data).toLowerCase()) ===
          0
      );
      console.log(matches);

      response.end(JSON.stringify(matches));
    } else {
      missingHandler(request, response);
    }
  });
}

module.exports = autoHandler;
