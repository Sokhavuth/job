import { setDbConnection } from '../../../tool'
import mongoose from 'mongoose'

export default async () => {
  await setDbConnection()

  const usersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    userid: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    info: {type: String, required: false},
    date: {type: Date, required: true}
  })

  mongoose.models = {}
  const user = mongoose.model('users', usersSchema)

  return user
}