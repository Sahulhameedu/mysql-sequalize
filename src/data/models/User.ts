import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import Post from "./Posts";

@Table({
  tableName: "users",
  modelName: "User",
})
export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      len: [1, 100],
    },
  })
  get name(): string {
    return this.getDataValue("name").toUpperCase();
  }

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  set email(value: string) {
    this.setDataValue("email", value ? value.toLowerCase() : value);
  }

  @Column(DataType.VIRTUAL)
  get joined_on(): CreationOptional<string> {
    return this.getDataValue("CrAt").toISOString().split("T")[0];
  }

  @CreatedAt
  declare CrAt: CreationOptional<Date>;

  @UpdatedAt
  declare UpAt: CreationOptional<Date>;

  @DeletedAt
  declare DelAt: CreationOptional<Date>;

  @HasMany(() => Post)
  declare posts?: InferAttributes<Post>[];

  toJson() {
    return {
      ...this.get(),
      CrAt: undefined,
      UpAt: undefined,
      DelAt: undefined,
    };
  }
}
