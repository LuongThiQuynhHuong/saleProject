'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemInBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ItemInBill.init({
    billId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemInBill',
  });
  return ItemInBill;
};