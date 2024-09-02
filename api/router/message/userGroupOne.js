
const { Message, User } = require('../../models')
const Promise = require('bluebird')

module.exports = async(req, res) => {
  try {
    const groupName = req.params.groupName
    const UserList = []

    const userData = await User.findAll({
      where: {
        group: groupName,
        deleted_at: null
      },
      attributes: ['id', 'user_no']
    })

    userData.forEach((item) => {
      UserList.push({
        id: item.id,
        user_no: item.user_no
      })
      return item.id
    })

    await Promise.each(UserList, async(item, idx) => {
      const message = await Message.findAll({
        where: {
          user: item.id
        },
        order: [['createdAt', 'DESC']]
      })
      UserList[idx].message = message
      UserList[idx].total = message.length
    })

    return res.json({ code: 20000, data: UserList })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}
