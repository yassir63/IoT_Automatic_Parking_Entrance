'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filepath1 = path.resolve(__dirname, './images/1.jpg');
    const filepath2 = path.resolve(__dirname, './images/2.jpg');
    const Picture1 = Buffer.from(fs.readFileSync(filepath1));
    const Picture2 = Buffer.from(fs.readFileSync(filepath2));

    await queryInterface.bulkInsert('Employees', [
      {
        rfidCode: "001",
        facepicture: Picture1,
        ParkingUserId: 1,
      },
      {
        rfidCode: "002",
        facepicture: Picture2,
        ParkingUserId: 2,
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Employees', null, {});
    
  }
};
