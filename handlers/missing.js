const fs = require("fs");
const path = require("path");

function missingHandler(request, response) {
  const filepath = path.join(__dirname, "../public/", "notfound.html");
  //   console.log(filepath);
  fs.readFile(filepath, (error, notFoundFile) => {
    response.writeHead(404, {"content-type": "text/html"});
    response.end(notFoundFile);
  });
}

module.exports = missingHandler;
