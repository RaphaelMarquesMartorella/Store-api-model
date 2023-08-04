const express = require('express')

const router = express.Router()

const {
    createStock,
    getStock,
    getAllStock
} = require('../controllers/stock')

router.post('/stock', createStock)
router.get('/stock', getStock).get('/allStock', getAllStock)

module.exports = router