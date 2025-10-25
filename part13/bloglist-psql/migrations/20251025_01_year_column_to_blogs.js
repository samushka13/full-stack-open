import { DataTypes } from "sequelize";

const minMsg = "The year must be equal to or greater than 1991";
const maxMsg = "The year must be equal to or less than the current year";

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1991], msg: minMsg },
      max: { args: [new Date().getFullYear()], msg: maxMsg },
    },
  });
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year");
};
