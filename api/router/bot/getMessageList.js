
const { Conversations, Message } = require('../../models')

module.exports = async(req, res) => {
  const { user_no, story_id } = req.query
  try {
    if (!user_no || !story_id) throw Error('資料有問題')
    const item = await Conversations.findOne({
      where: {
        user_no,
        story_id,
        is_finished: false,
        deleted_at: null
      }
    })

    if (!item) {
      return res.json({ code: 20000, data: [] })
    }

    const resultList = await Message.findAll({
      where: {
        conversation_id: item.id
      }
    })

    return res.json({ code: 20000, data: resultList })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

