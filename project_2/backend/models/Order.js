// Order.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("Order", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.ENUM("inside", "outside"),
    defaultValue: "inside",
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shippingCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending", // Pending, Shipped, Delivered, Cancelled
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: "Cash on Delivery",
  }
}, {
  tableName: "orders",
  timestamps: true,
});

module.exports = Order;



