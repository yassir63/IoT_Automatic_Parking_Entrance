'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        name: "sohaib",
        username: "IS",
        mail: "IS@gmail.com",
        password: "ISpass",
        role: "Security"
      },
      {
        name: "yassir",
        username: "AY",
        mail: "AY@gmail.com",
        password: "AYpass",
        role: "Management"
      },
      {
        name: "saadeddine",
        username: "TS",
        mail: "TS@gmail.com",
        password: "TSpass",
        role: "Security"
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
