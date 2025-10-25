import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

class BlogList extends Model {}

BlogList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "blogList",
  }
);

export default BlogList;
