import schema from './schema'

async function getJobs (amount, q) {
  const jobSchema = await schema()
  
  var jobs = await jobSchema.find({ enddate: {$gte: new Date()}, $text : { $search : q } })
                      .sort({postdate: -1, _id: -1})
                      .limit(amount)

  return  JSON.stringify(jobs)
  
}

module.exports = getJobs