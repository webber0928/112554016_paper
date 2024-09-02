
const { User } = require('../../models')

module.exports = async(req, res) => {
  try {
    const Sequelize = require('sequelize')
    const result = await User.findAll({
      attributes: [
        'group',
        [Sequelize.fn('COUNT', Sequelize.col('group')), 'total_users']
      ],
      group: ['group']
    })

    return res.json({ code: 20000, data: result })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}
