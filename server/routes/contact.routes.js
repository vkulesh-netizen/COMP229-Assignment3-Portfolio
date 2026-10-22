import { requireSignin, requireAdmin } from '../middleware/auth.middleware.js'
import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'

const router = express.Router()

router.route('/api/contacts')
  .get(requireSignin, requireAdmin, contactCtrl.list)
  .post(requireSignin, requireAdmin, contactCtrl.create)
  .delete(requireSignin, requireAdmin, contactCtrl.removeAll)

router.route('/api/contacts/:contactId')
  .get(requireSignin, requireAdmin, contactCtrl.read)
  .put(requireSignin, requireAdmin, contactCtrl.update)
  .delete(requireSignin, requireAdmin, contactCtrl.remove)

router.post('/api/contact-messages', contactCtrl.create)

router.param('contactId', contactCtrl.contactByID)

export default router
