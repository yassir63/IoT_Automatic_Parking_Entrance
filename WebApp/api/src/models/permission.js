'use strict';
const {
  Model,Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Site,ParkingUser}) {
      this.belongsToMany(Site,{through:"Site_Permission"})
      this.belongsToMany(ParkingUser,{through:"ParkingUser_Permission"})
    }
  }
  Permission.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    AccessPeriods: {
      type: DataTypes.STRING,
      allowNull:false
    },
  }, {
    
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};