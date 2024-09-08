'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      story_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
    await queryInterface.addColumn('Message', 'conversation_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'story_id'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations')
    await queryInterface.removeColumn('Message', 'conversation_id')
  }
}
