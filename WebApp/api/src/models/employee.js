'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model { 
    static associate({ParkingUser}) {
        this.belongsTo(ParkingUser,{foreignKey:{unique: true}})
      }
  }
  Employee.init({
    rfidCode: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    facepicture: {
        type: DataTypes.BLOB,
        allowNull:false,
        unique: true
    },

    
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};