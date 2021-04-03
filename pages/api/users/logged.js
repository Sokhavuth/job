import { withIronSession } from "next-iron-session"

function handler(req, res) {
  const user = req.session.get("user")
  res.json({user: user})
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY,
  cookieName: 'logged-in',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
})