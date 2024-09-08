
const { Conversations } = require('../../models')

module.exports = async(req, res) => {
  const { user_no, story_id, id } = req.body
  try {
    if (!user_no || !story_id || !id) throw Error('資料有問題')
    const item = await Conversations.findOne({
      where: {
        id,
        user_no,
        story_id,
        is_finished: false,
        deleted_at: null
      }
    })
    item.set('is_finished', true)
    await item.save()
    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

