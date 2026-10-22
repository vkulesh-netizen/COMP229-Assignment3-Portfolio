import Contact from '../models/contact.model.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const contact = await Contact.create(req.body)
    return res.status(201).json(contact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 })
    return res.json(contacts)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    req.contact = contact
    return next()
  } catch (_err) {
    return res.status(400).json({ error: 'Could not retrieve contact' })
  }
}

const read = (req, res) => res.json(req.contact)

const update = async (req, res) => {
  try {
    const allowedFields = ['firstname', 'lastname', 'email', 'contactNumber', 'message']
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) req.contact[field] = req.body[field]
    }
    await req.contact.save()
    return res.json(req.contact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.contact._id)
    return res.json(deletedContact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (_req, res) => {
  try {
    const result = await Contact.deleteMany({})
    return res.json({
      message: 'All contacts deleted successfully',
      deletedCount: result.deletedCount,
    })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, contactByID, read, update, remove, removeAll }
