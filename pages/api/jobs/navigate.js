import schema from './schema'
import setting from '../../../setting'

export default async function getJob (req, res) {
  const _schema = await schema()
  const amount = setting.frontPagePostLimit
  
  if (req.body.name){
    var jobs = await _schema.find({ enddate: {$gte: new Date()}, categories: req.body.name }).skip(amount * req.body.page).sort({postdate: -1, _id: -1}).limit(amount)
  }else{
    var jobs = await _schema.find({ enddate: {$gte: new Date()} }).skip(amount * req.body.page).sort({postdate: -1, _id: -1}).limit(amount)
  }
  
  res.json({ jobs: jobs })
}