'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Sites', [
      {
        name: "Site1",
        address: "Address 1",
      },
      {
        name: "Site2",
        address: "Address 2",
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Sites', null, {});
    
  }
};
