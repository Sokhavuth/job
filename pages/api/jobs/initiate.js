import schema from './schema'

async function getJobs (amount) {
  const jobSchema = await schema()
  var jobs = await jobSchema.find().sort({postdate: -1, _id: -1}).limit(amount)
  const count = await jobSchema.countDocuments({})

  return  JSON.stringify({ jobs: jobs, count: count })
}

module.exports = getJobs