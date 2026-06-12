import { Seeder } from "../../umzug";
import { faker } from "@faker-js/faker";

const users = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  CrAt: new Date(),
  UpAt: new Date(),
}));

const posts = Array.from({ length: 10 }, (_, index) => {
  const title = faker.book.title();
  return {
    id: index + 1,
    title,
    body: faker.lorem.paragraph(),
    slug: faker.helpers.slugify(title).toLowerCase(),
    user_id: faker.helpers.arrayElement(users.map((item) => item.id)),
    CrAt: new Date(),
    UpAt: new Date(),
  };
});

const tags = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: faker.lorem.word(),
  CrAt: new Date(),
  UpAt: new Date(),
}));

const postTags = posts.map((post) => {
  const tagIds = faker.helpers.arrayElements(
    tags.map((tag) => tag.id),
    3,
  );

  return tagIds.map((tagId) => ({
    post_id: post.id,
    tag_id: tagId,
  }));
});

export const up: Seeder = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.bulkInsert("users", users);

  await queryInterface.bulkInsert("posts", posts);

  await queryInterface.bulkInsert("tags", tags);

  for (const postTagsArray of postTags) {
    await queryInterface.bulkInsert("post_tag", postTagsArray);
  }
};

export const down: Seeder = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.bulkDelete("post_tag", {
    post_id: posts.map((u) => u.id),
  });
  await queryInterface.bulkDelete("tags", { id: tags.map((u) => u.id) });
  await queryInterface.bulkDelete("posts", { id: posts.map((u) => u.id) });
  await queryInterface.bulkDelete("users", { id: users.map((u) => u.id) });
};
