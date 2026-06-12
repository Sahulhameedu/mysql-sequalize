import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
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
import User from "./User";
import Tag from "./Tag";
import PostTag from "./PostTag";

@Table({
  tableName: "posts",
  timestamps: true,
})
export default class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare user_id: number;

  @AllowNull(false)
  @Column({
    validate: {
      len: [1, 100],
    },
  })
  declare title: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare body: string;

  @Column
  declare slug: string;

  @CreatedAt
  declare CrAt: CreationOptional<Date>;

  @UpdatedAt
  declare UpAt: CreationOptional<Date>;

  @BelongsTo(() => User)
  declare user?: InferAttributes<User>;

  @BelongsToMany(() => Tag, () => PostTag)
  declare tags?: InferAttributes<Tag>[];

  @BeforeCreate
  static async generateSlug(instance: Post) {
    const count = await Post.count({
      where: {
        title: instance.title,
      },
    });
    let suffix = "";
    if (count > 0) {
      suffix = `-${count + 1}`;
    }
    instance.slug = instance.title.toLowerCase().replace(/ /g, "-") + suffix;
  }

  toJson() {
    return {
      ...this.get(),
      user_id: undefined,
      CrAt: this.CrAt.toISOString(),
      UpAt: this.UpAt.toISOString(),
    };
  }
}
