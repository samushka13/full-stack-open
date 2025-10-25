import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "readingList",
  }
);

export default ReadingList;
