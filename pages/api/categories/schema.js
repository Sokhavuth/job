import { setDbConnection } from '../../../tool'
import mongoose from 'mongoose'

export default async () => {
  await setDbConnection()

  const categoriesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    info: {type: String, required: false},
    date: {type: Date, required: true}
  })

  mongoose.models = {}
  const category = mongoose.model('categories', categoriesSchema)

  return category
}