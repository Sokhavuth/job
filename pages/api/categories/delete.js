import schema from './schema'

export default async (req, res) => {
  const category = await schema()

  const _category = await category.findOne({ id: req.body.id})
  await category.deleteOne({ id: req.body.id})

  res.json({ category: _category })
}