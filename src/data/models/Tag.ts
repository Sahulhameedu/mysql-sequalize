import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  AllowNull,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Post from "./Posts";
import PostTag from "./PostTag";

@Table({
  tableName: "tags",
  modelName: "Tag",
})
export default class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column({
    validate: {
      len: [1, 30],
    },
  })
  declare name: string;

  @CreatedAt
  declare CrAt: CreationOptional<Date>;

  @UpdatedAt
  declare UpAt: CreationOptional<Date>;

  @BelongsToMany(() => Post, () => PostTag)
  declare posts?: InferAttributes<Post>[];

  toJSON() {
    return {
      ...this.get(),
      CrAt: undefined,
      UpAt: undefined,
    };
  }
}
