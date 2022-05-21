import schema from './schema'

export default async (req, res) => {
  const jobSchema = await schema()

  const job = await jobSchema.findOne({ id: req.body.id})
  await jobSchema.deleteOne({ id: req.body.id})

  res.json(job)
}