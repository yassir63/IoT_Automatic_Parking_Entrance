'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Visitors', [
      {
        QrCode: "003",
        ParkingUserId: 3,
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Visitors', null, {});
    
  }
};
