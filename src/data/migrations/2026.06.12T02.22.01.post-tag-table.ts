import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("post_tag", {
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    tag_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("post_tag");    
};
