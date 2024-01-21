'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParkingUser extends Model { 
    static associate({Vehicle,Employee,Visitor,Permission}) {
        this.hasMany(Vehicle)
        this.hasOne(Employee)
        this.hasOne(Visitor)
        this.belongsToMany(Permission,{through:"ParkingUser_Permission"})
        
      }
  }
  ParkingUser.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    type: {
        type: DataTypes.STRING
    }
    

    
  }, {
    sequelize,
    modelName: 'ParkingUser',
  });
  return ParkingUser;
};