const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Video extends Model {}

Video.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'post',
  }
);

module.exports = Video;
