import schema from './schema'

export default async function getCategory (req, res) {
  const category = await schema()
  const _category = await category.find({ id: req.body.id })
  res.json({ category: _category })
}