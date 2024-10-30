const { Trigger } = require('../../models')
const Sequelize = require('sequelize')

module.exports = async(req, res) => {
  try {
    const { date = null } = req.query
    const where = {}
    if (date) {
      where.createdAt = {
        [Sequelize.Op.between]: [
          Sequelize.fn('CONVERT_TZ', `${date} 00:00:00`, '+08:00', '+00:00'),
          Sequelize.fn('CONVERT_TZ', `${date} 23:59:59`, '+08:00', '+00:00')
        ]
      }
    }

    const trigger = await Trigger.findAll({
      where: {
        ...where
      },
      attributes: [
        'id',
        'user_no',
        'story_id',
        'count',
        'word',
        'type',
        'createdAt',
        'updatedAt'
      ],
      order: [['createdAt', 'ASC']]
    })

    return res.json({ code: 20000, data: trigger })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}
