import Post from "../models/Posts";
import Tag from "../models/Tag";
import User from "../models/User";
import BaseRepository, { Constructor } from "./BaseRepository";

import { Model } from "sequelize";

export function AddPostRepository<TBase extends Constructor<BaseRepository>>(
  Base: TBase,
) {
  return class extends Base {
    async createUserPost(
      user: User,
      postAttributes: { title: string; body: string },
      tagNames?: string[],
    ) {
      const post = await user.$create("posts", postAttributes);
      if (tagNames) {
        const tags = await Promise.all(
          tagNames.map(async (name) => {
            const [tag] = await Tag.upsert({ name });
            return tag;
          }),
        );
        await post.$set("tags" as keyof Model, tags);
        await post.reload({
          include: {
            model: Tag,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        });
      }
    }

    getUserPosts(user: User) {
      return user.$get("posts", {
        limit: this.defaultLimit,
      });
    }
    getPosts() {
      return Post.findAll({
        limit: this.defaultLimit,
        include: { model: User, attributes: ["id", "name"] },
      });
    }

    getPost(id: number) {
      return Post.findByPk(id);
    }

    async getPostsByTag(tagId: number) {
      const tag = await Tag.findByPk(tagId);
      if (!tag) {
        throw new Error("Tag not found");
      }
      return tag.$get("posts", {
        limit: this.defaultLimit,
        include: [
          {
            model: Tag,
            through: { attributes: [] },
            attributes: ["id", "name"],
          },
        ],
        joinTableAttributes: ["id", "name"],
      } as any);
    }
  };
}
