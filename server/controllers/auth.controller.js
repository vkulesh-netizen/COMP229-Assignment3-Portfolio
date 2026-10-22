import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import config from '../../config/config.js'

const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ error: 'Email and password do not match' })
    }

    const token = jwt.sign(
      { _id: user._id.toString(), version: user.updated.getTime() },
      config.jwtSecret,
      { expiresIn: '1h' },
    )

    res.cookie('t', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.env === 'production',
      maxAge: 60 * 60 * 1000,
    })

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const signout = (_req, res) => {
  res.clearCookie('t')
  return res.json({ message: 'Signed out successfully' })
}

const protectedRoute = (req, res) => {
  return res.json({
    message: 'JWT authentication successful. This is a protected route.',
    auth: req.auth,
  })
}

export default { signin, signout, protectedRoute }
