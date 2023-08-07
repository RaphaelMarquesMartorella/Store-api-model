const express = require('express')
const {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/Product')

const router = express.Router()

router.get('/products', getProducts).get('/product/:id', getOneProduct)
router.post('/product', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router