import express from 'express'
import { checkSession } from '../middleware/AuthUsers.js'
import { addPengeluaran,
        getPengeluaran,
        getPengeluaranOneWeekAgo,
        updatePengeluaran, 
} from '../controllers/Pengeluaran.js'

const router = express.Router()

router.post('/pengeluaran', checkSession, addPengeluaran)
router.get('/pengeluaran', checkSession, getPengeluaran)
router.get('/pengeluaran/oneWeek', checkSession, getPengeluaranOneWeekAgo)
router.patch('/pengeluaran/:id', checkSession, updatePengeluaran)


export default router