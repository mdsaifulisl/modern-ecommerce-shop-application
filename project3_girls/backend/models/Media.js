const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Media = sequelize.define('Media', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('slider', 'gallery'),
    allowNull: false,
    defaultValue: 'slider',
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Used for Cloudinary/Firebase file deletion'
  }
}, {
  timestamps: true,
  tableName: 'media',
});

module.exports = Media;


