'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('ParkingUsers', [
      {
        name: "sohaib",
        mail: "IS@gmail.com",
        type: "Employee",
      },
      {
        name: "saadeddine",
        mail: "TS@gmail.com",
        type: "Employee",
      },
      {
        name: "yassir",
        mail: "AY@gmail.com",
        type: "Visitor",
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('ParkingUsers', null, {});
    
  }
};
