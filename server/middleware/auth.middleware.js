import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import config from '../../config/config.js'
export const requireSignin = async (req,res,next) => {
  const header=req.get('Authorization')||''
  const token=header.startsWith('Bearer ')?header.slice(7):req.cookies?.t
  if(!token) return res.status(401).json({error:'Please sign in.'})
  try {
    const payload=jwt.verify(token,config.jwtSecret)
    const user=await User.findById(payload._id)
    if(!user || payload.version !== user.updated.getTime()) return res.status(401).json({error:'Session expired. Please sign in again.'})
    req.auth={_id:user._id.toString(),name:user.name,email:user.email,role:user.role}
    next()
  } catch { return res.status(401).json({error:'Invalid or expired session.'}) }
}
export const requireAdmin=(req,res,next)=>req.auth?.role==='admin'?next():res.status(403).json({error:'Administrator access required.'})
