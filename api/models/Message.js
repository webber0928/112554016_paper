// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isBot: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue('message'))
      }
    },
    execute_date: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'Message',
    timestamps: true
  })

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'user' })
    Message.belongsTo(models.Story, { foreignKey: 'story_id' })
  }
  return Message
}
