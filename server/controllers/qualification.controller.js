import Qualification from '../models/qualification.model.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body)
    return res.status(201).json(qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (_req, res) => {
  try {
    return res.json(await Qualification.find().sort({ completion: -1 }))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id)
    if (!qualification) return res.status(404).json({ error: 'Qualification not found' })
    req.qualification = qualification
    return next()
  } catch (_err) {
    return res.status(400).json({ error: 'Could not retrieve qualification' })
  }
}

const read = (req, res) => res.json(req.qualification)

const update = async (req, res) => {
  try {
    const fields = ['title', 'firstname', 'lastname', 'email', 'completion', 'description', 'school', 'period']
    for (const field of fields) {
      if (req.body[field] !== undefined) req.qualification[field] = req.body[field]
    }
    await req.qualification.save()
    return res.json(req.qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedQualification = await Qualification.findByIdAndDelete(req.qualification._id)
    return res.json(deletedQualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (_req, res) => {
  try {
    const result = await Qualification.deleteMany({})
    return res.json({
      message: 'All qualifications deleted successfully',
      deletedCount: result.deletedCount,
    })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, qualificationByID, read, update, remove, removeAll }
