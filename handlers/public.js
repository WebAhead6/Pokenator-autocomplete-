const fs = require("fs");
const path = require("path");
const missingHandler = require("./missing");

const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  json: "application/json",
  icon: "image/x-icon",
  gif: "image/gif",
};

function publicHandler(request, response) {
  const url = request.url;
  const urlArr = url.split(".");
  const ext = urlArr[1];
  const type = types[ext];

  const filepath = path.join(__dirname, "..", url);
  console.log(filepath);
  fs.readFile(filepath, (error, file) => {
    if (error) {
      missingHandler(request, response);
    } else {
      response.writeHead(200, {"content-type": type});
      response.end(file);
    }
  });
}

module.exports = publicHandler;
