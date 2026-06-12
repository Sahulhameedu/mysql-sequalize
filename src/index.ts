import { createServer } from "./server";
import repository from "./data/repository";

const server = createServer();

const port = process.env.PORT || 3000;
server.listen(port, async () => {
  try {
    await repository.sequelizeClient.sync();
    console.log("Database connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
  console.log(`Server running on port ${port}`);
});
