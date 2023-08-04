import express from "express"
import { register, updaetUser } from "../controllers/Users.js"
import { checkSession } from "../middleware/AuthUsers.js"
const router = express.Router()

router.post('/register', register)
router.patch('/user/:id', checkSession, updaetUser)

export default router