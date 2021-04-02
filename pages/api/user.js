import { setDbConnection } from '../../tool'

export default async (req, res) => {
  await setDbConnection()
  res.status(200).json({ email: req.body.email, password: req.body.password })
}
