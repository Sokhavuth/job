import schema from './schema'

async function getRandomJobs (amount) {
  const jobSchema = await schema()

  const randomJobs = await jobSchema.aggregate([ {$match: {enddate: {$gte: new Date()}}}, {$sample:{size: amount}} ])
  
  return JSON.stringify(randomJobs)
  
}

module.exports = getRandomJobs