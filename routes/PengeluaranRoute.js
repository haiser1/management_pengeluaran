import express from 'express'
import { checkSession } from '../middleware/CheckSession.js'
import { addPengeluaran,
        deletePengeluaran,
        getPengeluaran,
        getPengeluaranDayAgo,
        getSumPengeluaranDayAgo,
        updatePengeluaran, 
} from '../controllers/Pengeluaran.js'

const router = express.Router()

router.post('/users/pengeluaran', checkSession, addPengeluaran)
router.get('/users/pengeluaran', checkSession, getPengeluaran)
router.get('/users/pengeluaran/:day', checkSession, getPengeluaranDayAgo)
router.get('/users/total-pengeluaran/:day', checkSession, getSumPengeluaranDayAgo)
router.patch('/users/pengeluaran/:id', checkSession, updatePengeluaran)
router.delete('/users/pengeluaran/:id', checkSession, deletePengeluaran)


export default router