const homeHandler = require("./handlers/home");
const publicHandler = require("./handlers/public");
const missingHandler = require("./handlers/missing");
const autoHandler = require("./handlers/auto");
const pokeFetcher = require("./handlers/pokeFetcher");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    // will handle the landing page
    homeHandler(request, response);
  } else if (url.includes("public")) {
    // will handle routing
    publicHandler(request, response);
  } else if (url === "/autocomplete" && request.method === "POST") {
    autoHandler(request, response);
  } else if (url == "/pokeFetcher" && request.method === "POST") {
    pokeFetcher(request, response);
  } else {
    //we should display a temporary error page, then redirect back to the index
    missingHandler(request, response);
  }
}

module.exports = router;
