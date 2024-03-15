import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  const responseBody = {
    location: "Mars"
  };

  const jsonResponseBody = JSON.stringify(responseBody);

  response.end(jsonResponseBody);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});


/* Content-Length: 19 */