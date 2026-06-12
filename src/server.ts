import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { createRoutes } from "./routes";
import errorHandler from "./middleware/error-handler";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({ ok: true });
  });

  createRoutes(app);

  app.use(errorHandler);

  return app;
};
