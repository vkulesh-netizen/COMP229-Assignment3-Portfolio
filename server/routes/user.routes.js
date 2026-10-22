import { requireSignin, requireAdmin } from '../middleware/auth.middleware.js'
import express from 'express'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.route('/api/users')
  .get(requireSignin, requireAdmin, userCtrl.list)
  .post(userCtrl.create)
  .delete(requireSignin, requireAdmin, userCtrl.removeAll)

router.route('/api/users/:userId')
  .get(requireSignin, requireAdmin, userCtrl.read)
  .put(requireSignin, requireAdmin, userCtrl.update)
  .delete(requireSignin, requireAdmin, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router
