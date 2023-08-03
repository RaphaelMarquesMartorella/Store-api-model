const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    productName: {
        type: String,
        required: [true, 'Please provide the productName.']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description.']
    },
    price: {
        type: String,
        required: [true, 'Please provide a price.']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category.']
    }
})

module.exports = mongoose.model('products', productSchema)