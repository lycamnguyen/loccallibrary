import { AppDataSource } from "./config/data-source";
import http from "http";
import app from "./server";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server is running on port", 3000);
});
