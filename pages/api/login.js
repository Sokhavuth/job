import { setDbConnection } from '../../tool'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export default async (req, res) => {
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

  if(req.method === 'POST'){
    var userData = await user.findOne({email: req.body.email})
    if(userData){
      if(bcrypt.compareSync(req.body.password, userData.password)){
        res.status(200).json({data: userData})
      }else{
        res.status(200).json({data: false, message: "The password is wrong."})
      }
    }else{
      res.status(200).json({data: userData, message: "The email is wrong."})
    }
    
  }else{
    
  }
}
