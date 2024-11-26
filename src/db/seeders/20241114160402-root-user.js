'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
   await queryInterface.bulkInsert('Usuarios', [{
    email: 'root@gmail.com',
    senha: '$2b$10$PL3mq3YR9/EZsswR44/lNu.nJiGfYX1n4fRpo0TkRriQEkrESFM2y',
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Usuarios', {email: 'root@gmail.com'}, {})
  }
};
