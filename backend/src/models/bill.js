'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bill.init({
    userId: DataTypes.INTEGER,
    time: DataTypes.DATE,
    addressId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN, //1: da thanh toan, 0: chua thanh toan
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};