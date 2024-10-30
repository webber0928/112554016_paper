const { Message, User, Story } = require('../../models')
const Sequelize = require('sequelize')

module.exports = async(req, res) => {
  try {
    const { date = null } = req.query
    const where = {}
    if (date) {
      where.execute_date = date.match(/\d+/g).join('')
    }

    const message = await Message.findAll({
      where: {
        ...where,
        type: {
          [Sequelize.Op.notIn]: ['system', 'story']
        }
      },
      attributes: ['id', 'type', 'isBot', 'message', 'execute_date', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          where: {
            group: [62, 64]
          },
          attributes: ['user_no', 'group'] // 如果不需要從 User 模型中返回任何字段，可以留空，這樣會提高效能
        },
        {
          model: Story,
          attributes: ['ranking', 'title'] // 如果不需要從 User 模型中返回任何字段，可以留空，這樣會提高效能
        }
      ],
      order: [['execute_date', 'ASC']]
    })

    return res.json({ code: 20000, data: message })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}
