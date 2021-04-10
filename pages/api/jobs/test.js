import schema from './schema'

export default async function getJob (req, res) {
  const jobSchema = await schema()
  //const job = await jobSchema.find({ id: req.body.id })
  //res.json({ job: 'Hello' })
  return "Hello"
}

async function get_Job (id) {
  const jobSchema = await schema()
  const job = await jobSchema.findOne({ id: id })
  return { job: JSON.stringify(job) }
}

module.exports = get_Job