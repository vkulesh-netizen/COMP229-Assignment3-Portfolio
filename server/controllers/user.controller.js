import User from '../models/user.model.js'
import errorHandler from './error.controller.js'

const safeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user }
  delete obj.password
  return obj
}

const create = async (req, res) => {
  try {
    const user = await User.create({name:req.body.name,email:req.body.email,password:req.body.password,role:"user"})
    return res.status(201).json(safeUser(user))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (_req, res) => {
  try {
    return res.json(await User.find().sort({ created: -1 }))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    return next()
  } catch (_err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

const read = (req, res) => res.json(safeUser(req.profile))

const update = async (req, res) => {
  try {
    const fields = ['name', 'email', 'password']
    for (const field of fields) {
      if (req.body[field] !== undefined) req.profile[field] = req.body[field]
    }
    req.profile.updated = new Date()
    await req.profile.save()
    return res.json(safeUser(req.profile))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.profile._id)
    return res.json(safeUser(deletedUser))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (_req, res) => {
  try {
    const result = await User.deleteMany({})
    return res.json({
      message: 'All users deleted successfully',
      deletedCount: result.deletedCount,
    })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, userByID, read, update, remove, removeAll }
