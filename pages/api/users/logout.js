import { withIronSession } from "next-iron-session"

async function handler(req, res, session) {
  await req.session.destroy()
  res.json({logout: 'success'})
}

export default withIronSession(handler, {
  password: process.env.SESSION_KEY,
  cookieName: 'logged-in',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
})