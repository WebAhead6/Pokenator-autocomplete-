const homeHandler = require("./handlers/home");
const publicHandler = require("./handlers/public");
const missingHandler = require("./handlers/missing");
const autoHandler = require("./handlers/auto");

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
  } else {
    //we should display a temporary error page, then redirect back to the index
    missingHandler(request, response);
  }
}

module.exports = router;
