const express = require('express')

const router = express.Router()

const {
    createStock,
    getStock,
    getAllStock,
    updateStock,
    deleteStock
    
} = require('../controllers/stock')

router.post('/stock', createStock)
router.get('/stock', getStock).get('/allStock', getAllStock)
router.put('/stock/:id', updateStock)
router.delete('/stock/:id', deleteStock)

module.exports = router