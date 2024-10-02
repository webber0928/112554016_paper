const { Message } = require('../../models')

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
      group: ['execute_date'],
      having: Sequelize.where(Sequelize.fn('COUNT', Sequelize.col('*')), '>=', 50),
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
