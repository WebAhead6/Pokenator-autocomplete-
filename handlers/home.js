const fs = require("fs");
const path = require("path");
const missingHandler = require("./missing");

function homeHandler(request, response) {
  const filepath = path.join(__dirname, "../public/", "index.html");
  console.log(filepath);
  fs.readFile(filepath, (error, file) => {
    if (error) {
      missingHandler(request, response);
    } else {
      response.writeHead(200, {"content-type": "text/html"});
      response.end(file);
    }
  });
}

module.exports = homeHandler;
