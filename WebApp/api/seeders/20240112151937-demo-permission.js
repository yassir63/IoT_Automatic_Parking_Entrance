'use strict';
const {Permission,Site,ParkingUser} = require('../src/models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Permissions', [
      {
        AccessPeriods: '["1","1","1","1","1","1","0"]',
      },
      {
        AccessPeriods: '["2","2","2","2","2","2","0"]',
      },
      {
        AccessPeriods: '["0","5","5","0","0","0","0"]',
      },
      {
        AccessPeriods: '["1","1","1","1","1","1","0"]',
      },
      {
        AccessPeriods: '["2","2","2","2","2","2","0"]',
      },
    ], {});

    const permissions = await Permission.findAll();
    const sites = await Site.findAll();
    const parkingUsers = await ParkingUser.findAll();

    await permissions[0].setSites([sites[0]])
    await permissions[1].setSites([sites[1]])
    await permissions[2].setSites([sites[0]])
    await permissions[3].setSites([sites[0],sites[1]])
    await permissions[4].setSites([sites[0],sites[1]])

    await permissions[0].addParkingUser(parkingUsers[0])
    await permissions[1].addParkingUser(parkingUsers[1])
    await permissions[2].addParkingUser(parkingUsers[2])
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Permissions', null, {});
    
  }
};
