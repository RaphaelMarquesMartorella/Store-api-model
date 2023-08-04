const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        ref: 'products'
    },
    saleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sales'
    },  
    status: {
        type: String
    },
    quantity: {
        type: Number
    },
});

module.exports = mongoose.model('requests', requestSchema);
