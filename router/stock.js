const express = require('express')

const router = express.Router()

const {
    createStock
} = require('../controllers/stock')

router.post('/stock', createStock)

module.exports = router