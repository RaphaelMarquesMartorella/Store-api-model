const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        unique: true
    },
    stockNumber: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('stock', stockSchema)