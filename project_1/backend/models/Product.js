const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Product = sequelize.define('Product', {
  
_id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4, // Sequelize generates automatically
  primaryKey: true,
  allowNull: false
},
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'General',
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discount_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sizes: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  }
}, {
  timestamps: true,
  tableName: 'products',
});

module.exports = Product;

