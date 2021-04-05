import { setDbConnection } from '../../tool'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { withIronSession } from "next-iron-session"

async function handler(req, res) {
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
        req.session.set("user", userData)
        await req.session.save()
        res.status(200).json({user: userData})
      }else{
        res.status(200).json({user: false, message: "The password is wrong."})
      }
    }else{
      res.status(200).json({user: userData, message: "The email is wrong."})
    }
    
  }else{
    
  }
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY,
  cookieName: 'logged-in',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
})