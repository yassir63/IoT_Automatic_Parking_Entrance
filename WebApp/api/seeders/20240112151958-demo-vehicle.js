'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Vehicles', [
      {
        brand: "Range Rover",
        licensePlateNumber: "112259h",
        ParkingUserId:1,
      },
      {
        brand: "Renault",
        licensePlateNumber: "1234579a",
        ParkingUserId:2,
      },
      {
        brand: "Mercedes",
        licensePlateNumber: "0012246a",
        ParkingUserId:3,
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Vehicles', null, {});
    
  }
};
