import { setDbConnection } from '../../../tool'
import mongoose from 'mongoose'

export default async () => {
  await setDbConnection()

  const jobSchemas = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
    content: { type: String, required: false },
    payable: { type: String, required: true },
    location: { type: String, required: true },
    postdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    link: { type: String, required: true },
  })

  mongoose.models = {}
  const jobSchema = mongoose.model('jobs', jobSchemas)

  return jobSchema
}