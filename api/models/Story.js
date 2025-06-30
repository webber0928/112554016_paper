// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    prompt_part: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    words: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function() {
        if (!this.getDataValue('words')) return null
        return JSON.parse(this.getDataValue('words'))
      }
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true // 預設值為 true
    },
    deleted_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'Story',
    timestamps: true
  })

  Story.associate = (models) => {
    Story.hasMany(models.Message, { foreignKey: 'story_id' })
  }

  return Story
}
