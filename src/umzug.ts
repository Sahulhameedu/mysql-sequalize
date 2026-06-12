import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, Options } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(config.db as Options);

export const migrator = new Umzug({
  migrations: {
    glob: ["data/migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations",
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: {
    glob: ["data/seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeders",
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;
