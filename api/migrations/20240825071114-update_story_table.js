'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Story', 'prompt_part', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'content'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Story', 'prompt_part')
  }
}

