const express = require('express')

const router = express.Router()

const {
    createSales,
    getSales,
    getOneSale,
    updateSale,
    deleteSale

} = require('../controllers/Sales')

router.get('/sales', getSales).get('/sale/:id', getOneSale)
router.post('/sale', createSales)
router.put('/sale/:id', updateSale)
router.delete('/sale/:id', deleteSale)

module.exports = router