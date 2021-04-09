import schema from './schema'
import setting from '../../../setting'

export default async function getJob (req, res) {
  const _schema = await schema()
  const amount = setting.frontPagePostLimit
  
  const jobs = await _schema.find().skip(amount * req.body.page).sort({date: -1, _id: -1}).limit(amount)

  res.json({ jobs: jobs })
}