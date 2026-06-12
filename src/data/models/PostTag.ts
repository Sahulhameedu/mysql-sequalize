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
  ForeignKey,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import Post from "./Posts";
import Tag from "./Tag";

@Table({
  tableName: "post_tag",
  modelName: "PostTag",
  timestamps: false,
})
export default class PostTag extends Model<
  InferAttributes<PostTag>,
  InferCreationAttributes<PostTag>
> {
  @ForeignKey(() => Post)
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare post_id: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare tag_id: number;
}
