const { Message, User } = require('../../models')

module.exports = async(req, res) => {
  try {
    const Sequelize = require('sequelize')
    const message = await Message.findAll({
      attributes: [
        'execute_date',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'total_records']
      ],
      where: {
        type: {
          [Sequelize.Op.notIn]: ['system', 'story']
        },
        execute_date: {
          [Sequelize.Op.gte]: '20240901'
        }
      },
      include: [
        {
          model: User,
          where: {
            group: [62, 64]
          },
          attributes: [] // 如果不需要從 User 模型中返回任何字段，可以留空，這樣會提高效能
        }
      ],
      group: ['execute_date'],
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
