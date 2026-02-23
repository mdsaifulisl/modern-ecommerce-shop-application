const { sequelize } = require('../config/db');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Product = require('./Product');

// --- DEFINE ASSOCIATIONS ---

Order.hasMany(OrderItem, { 
  foreignKey: 'orderId', 
  as: 'orderItems' 
});

OrderItem.belongsTo(Order, { 
  foreignKey: 'orderId',
  as: 'order' 
});

module.exports = {
  sequelize,
  Order,
  OrderItem,
  Product
};