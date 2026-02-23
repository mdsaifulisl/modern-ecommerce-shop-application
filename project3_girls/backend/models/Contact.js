const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        isEmail: true,
      },
    },
    number: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("unread", "read"),
      defaultValue: "unread",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "contacts",
  }
);

module.exports = Contact;
