import schema from './schema'
import setting from '../../../setting'

export default async function getCategory (req, res) {
  const _schema = await schema()
  const amount = setting.dashboardPostLimit
  
  const categories = await _schema.find().skip(amount * req.body.page).sort({date: -1, _id: -1}).limit(amount)

  res.json({ categories: categories })
}