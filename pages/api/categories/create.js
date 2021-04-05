import schema from './schema'

export default async (req, res) => {
  const category = await schema()

  const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
  const date = new Date(req.body.dateTime)
  const _category = new category({ id:id, name: req.body.categoryName, info:req.body.info, date: date })
  const _category_ = await _category.save()

  res.json({ category: _category_ })
}