'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    phonenumber: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.BOOLEAN, // 0: male, 1: female
    roleId: DataTypes.INTEGER //admin: 0; saler: 1; customer: 2
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};