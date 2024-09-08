// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define('Conversations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deleted_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'Conversations',
    timestamps: true
  })

  return Conversations
}
