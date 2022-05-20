'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemInCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ItemInCart.init({
    qty: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isChosen: DataTypes.BOOLEAN,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemInCart',
  });
  return ItemInCart;
};