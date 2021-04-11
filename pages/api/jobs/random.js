import schema from './schema'

async function getRandomJobs (amount) {
  const jobSchema = await schema()

  const total = await jobSchema.countDocuments()
  const randomJobs = []
  const ranNums = {}
  
  if (amount > total){
    amount = total
  }
  
  for (let v=0; v<amount; v++) {
    
    while (true){
      var skipNum = Math.floor(Math.random() * total) + 1
      if(!(skipNum.toString() in ranNums)){
        ranNums[skipNum] = 0
        break
      }
        
    }
    
    const randomJob = await jobSchema.findOne({enddate: { $gte: new Date() } }).skip(skipNum)
    randomJobs.push(randomJob)
  }

  return JSON.stringify(randomJobs)
  
}

module.exports = getRandomJobs