import { withIronSession } from "next-iron-session"

async function handler(req, res, session) {
  const user = await req.session.get("user")
  res.json({user: user})
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY,
  cookieName: 'logged-in',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
})