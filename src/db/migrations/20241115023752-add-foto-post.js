'use strict';

const { type } = require('../../schema/usuario.schema');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts', 'foto', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.removeColumn('Posts', 'foto')
}
};  
