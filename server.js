const http = require("http");

const router = require("./router");
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 5000;

const server = http.createServer(router);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Listining on http://${hostname}:${port}`)
);

// http.createServer(router).listen(port, hostname, () => {
//   console.log(`Server is running on port http://${hostname}:${port}`);
// });
