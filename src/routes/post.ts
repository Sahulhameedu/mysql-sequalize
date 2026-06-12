import { Express, Request, Response } from "express";
import repository from "../data/repository";
export const createPostRoutes = (app: Express) => {
  app.post("/posts", async (req: Request, res: Response) => {
    const userId = parseInt(req.body.user_id as string);

    const user = await repository.getUser(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const post = await repository.createUserPost(user, req.body);
    res.json({ post });
  });

  app.get("/users/:id/posts", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id as string);
    const user = await repository.getUser(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const posts = await repository.getUserPosts(user);
    res.json({ posts });
  });

  app.get("/posts", async (req: Request, res: Response) => {
    const posts = await repository.getPosts();
    res.json({ posts });
  });

  app.get("/tags/:id/posts", async (req: Request, res: Response) => {
    const tagId = parseInt(req.params.id as string);
    const posts = await repository.getPostsByTag(tagId);
    res.json({ posts });
  });
};
