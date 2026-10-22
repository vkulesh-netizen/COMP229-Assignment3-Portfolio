import Project from '../models/project.model.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const project = await Project.create(req.body)
    return res.status(201).json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (_req, res) => {
  try {
    return res.json(await Project.find().sort({ completion: -1 }))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    req.project = project
    return next()
  } catch (_err) {
    return res.status(400).json({ error: 'Could not retrieve project' })
  }
}

const read = (req, res) => res.json(req.project)

const update = async (req, res) => {
  try {
    const fields = ['title', 'firstname', 'lastname', 'email', 'completion', 'description', 'role', 'technologies', 'imageKey']
    for (const field of fields) {
      if (req.body[field] !== undefined) req.project[field] = req.body[field]
    }
    await req.project.save()
    return res.json(req.project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.project._id)
    return res.json(deletedProject)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (_req, res) => {
  try {
    const result = await Project.deleteMany({})
    return res.json({
      message: 'All projects deleted successfully',
      deletedCount: result.deletedCount,
    })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, projectByID, read, update, remove, removeAll }
