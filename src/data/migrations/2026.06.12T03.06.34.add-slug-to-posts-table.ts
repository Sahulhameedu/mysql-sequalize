import { DataTypes } from "sequelize";
import type { Migration } from "../../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn("posts", "slug", {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn("posts", "slug");
};
