// models/Visit.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Visit = sequelize.define(
  "Visit",
  {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "visits",
    timestamps: true,
  }
);

module.exports = Visit;
