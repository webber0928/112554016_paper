'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('User')
  }
}
