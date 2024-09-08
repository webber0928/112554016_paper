
const { Conversations } = require('../../models')

module.exports = async(req, res) => {
  const { user_no, story_id } = req.body
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
    if (item) {
      return res.json({ code: 20000, data: item })
    }
    const result = await Conversations.create({
      user_no,
      story_id
    })
    return res.json({ code: 20000, data: result })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

