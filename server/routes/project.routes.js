import { requireSignin, requireAdmin } from '../middleware/auth.middleware.js'
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'

const router = express.Router()

router.route('/api/projects')
  .get(projectCtrl.list)
  .post(requireSignin, requireAdmin, projectCtrl.create)
  .delete(requireSignin, requireAdmin, projectCtrl.removeAll)

router.route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(requireSignin, requireAdmin, projectCtrl.update)
  .delete(requireSignin, requireAdmin, projectCtrl.remove)

router.param('projectId', projectCtrl.projectByID)

export default router
