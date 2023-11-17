import express from 'express'
import { checkToken } from '../middleware/CheckToken.js'
import { addPengeluaran,
        deletePengeluaran,
        getPengeluaran,
        getPengeluaranById,
        updatePengeluaran, 
} from '../controllers/Pengeluaran.js'

const router = express.Router()

router.post('/users/pengeluaran', checkToken, addPengeluaran)
router.get('/users/pengeluaran', checkToken, getPengeluaran)
router.get('/users/pengeluaran/:id', checkToken, getPengeluaranById)
router.patch('/users/pengeluaran/:id', checkToken, updatePengeluaran)
router.delete('/users/pengeluaran/:id', checkToken, deletePengeluaran)


export default router