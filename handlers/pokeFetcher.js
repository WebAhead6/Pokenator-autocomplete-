const path = require("path");
const fs = require("fs");
const missingHandler = require("./missing");
const axios = require("axios").default;

function pokeFetcher(request, response) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      data = JSON.parse(data);
      console.log(" data we are gettinnngg innto server \n" + data);
      axios({
        method: "GET",
        url: data.pokeUrl,
      })
        .then((pokeData) => {
          console.log(
            " =================pokedata=============== \n",
            pokeData.data
          );
          response.end(JSON.stringify(pokeData.data));
        })
        .catch((error) => {
          console.error(error);
          missingHandler(request, response);
        });
    }
  });
}
module.exports = pokeFetcher;
