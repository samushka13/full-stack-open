import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

const minMsg = "The year must be equal to or greater than 1991";
const maxMsg = "The year must be equal to or less than the current year";

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: [1991], msg: minMsg },
        max: { args: [new Date().getFullYear()], msg: maxMsg },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "blog",
  }
);

export default Blog;
