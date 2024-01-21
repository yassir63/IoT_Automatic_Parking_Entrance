'use strict';
const {Model} = require('sequelize');

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { }
  User.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    mail: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue:"1",
      allowNull:false,
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        const hashpass= await bcrypt.hash(user.password, 10);
        user.password=hashpass
      },
      beforeUpdate: async (user, options) => {
        const hashpass= await bcrypt.hash(user.password, 10);
        user.password=hashpass
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};