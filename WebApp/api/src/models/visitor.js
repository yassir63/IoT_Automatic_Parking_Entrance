'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    static associate({ParkingUser}) {
        this.belongsTo(ParkingUser,{foreignKey:{unique: true}})
      }
   }
  Visitor.init({
    
    QrCode: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    }

    
  }, {
    sequelize,
    modelName: 'Visitor',
  });
  return Visitor;
};