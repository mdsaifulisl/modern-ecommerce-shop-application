const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Function to test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); 
  }
};

module.exports = { sequelize, connectDB };