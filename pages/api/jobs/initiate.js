import schema from './schema'

async function getJobs (amount, category=null) {
  const jobSchema = await schema()
  if (category) {
    var jobs = await jobSchema.find({ categories: category }).sort({postdate: -1, _id: -1}).limit(amount)
    return  JSON.stringify(jobs)
  } else {
    var jobs = await jobSchema.find().sort({postdate: -1, _id: -1}).limit(amount)
    var count = await jobSchema.countDocuments({})
    return  JSON.stringify({ jobs: jobs, count: count })
  }

  
}

module.exports = getJobs