import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import { requireSignin } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/auth/signin', authCtrl.signin)
router.get('/auth/signout', authCtrl.signout)
router.get('/auth/me', requireSignin, (req, res) => res.json(req.auth))
router.get('/api/protected', requireSignin, authCtrl.protectedRoute)

export default router
