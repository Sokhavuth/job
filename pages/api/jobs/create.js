import schema from './schema'

export default async (req, res) => {
  const jobSchema = await schema()
  var id = null
  var job = null

  const postdate = new Date(req.body.postDate)
  const enddate = new Date(req.body.endDate)
  let categories = req.body.categories
  categories = categories.replace(/ /g, '')
  categories = categories.split(',')
  categories.pop()
  
  if (!(req.body.id)){
    id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    job = new jobSchema({ id:id, title: req.body.title, categories: categories,
      content:req.body.content, payable: req.body.payable, 
      location: req.body.location, postdate: postdate, 
      enddate: enddate, link: req.body.link })
  } else {
    job = await jobSchema.findOne({ id: req.body.id })
    job.title = req.body.title
    job.categories = categories
    job.content = req.body.content
    job.payable = req.body.payable
    job.location = req.body.location
    job.postdate = postdate
    job.enddate = enddate
    job.link = req.body.link
  }
  
  await jobSchema.deleteMany({enddate:{$lt:new Date()}}).limit(200)
  const _job = await job.save()


  res.json({ job: _job })
}