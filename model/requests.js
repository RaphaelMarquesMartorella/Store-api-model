const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products' // Reference to the 'products' collection in the database
    },
    saleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sales' // Reference to the 'sales' collection in the database
    },  
    status: {
        type: String
    },
    quantity: {
        type: Number
    },
});

module.exports = mongoose.model('requests', requestSchema);
