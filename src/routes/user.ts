import { Express, Request, Response } from "express";
import repository from "../data/repository";

export const createUserRoutes = (app: Express) => {
  app.get("/users", async (req: Request, res: Response) => {
    const users = await repository.getUsers();
    res.json({ users });
  });

  app.get("/users/:id", async (req: Request, res: Response) => {
    const id = parseInt((req.params.id as string) || "10");
    const user = await repository.getUser(id);
    res.json({ user });
  });

  app.post("/users", async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const user = await repository.createUser({ name, email });
      res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: {
          message: (err as Error).message,
        },
      });
    }
  });

  app.put("/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const { name, email } = req.body;
      const user = await repository.updateUser(id, { name, email });
      res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: {
          message: (err as Error).message,
        },
      });
    }
  });

  app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const user = await repository.deleteUser(id);
      res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: {
          message: (err as Error).message,
        },  
      });
    }
  });
};
