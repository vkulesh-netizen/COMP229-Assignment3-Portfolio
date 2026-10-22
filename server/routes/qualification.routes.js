import { requireSignin, requireAdmin } from '../middleware/auth.middleware.js'
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'

const router = express.Router()

router.route('/api/qualifications')
  .get(qualificationCtrl.list)
  .post(requireSignin, requireAdmin, qualificationCtrl.create)
  .delete(requireSignin, requireAdmin, qualificationCtrl.removeAll)

router.route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read)
  .put(requireSignin, requireAdmin, qualificationCtrl.update)
  .delete(requireSignin, requireAdmin, qualificationCtrl.remove)

router.param('qualificationId', qualificationCtrl.qualificationByID)

export default router
