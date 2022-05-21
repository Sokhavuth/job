import schema from './schema'

export default async (req, res) => {
  const category = await schema()
  var id = null
  var _category = null

  const date = new Date(req.body.dateTime)

  if (!(req.body.id)){
    id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    _category = new category({ id:id, name: req.body.categoryName, info:req.body.info, date: date })
  } else {
    _category = await category.findOne({ id: req.body.id })
    _category.name = req.body.categoryName
    _category.info = req.body.info
    _category.date = date
  }
  
  const _category_ = await _category.save()

  res.json({ category: _category_ })
}