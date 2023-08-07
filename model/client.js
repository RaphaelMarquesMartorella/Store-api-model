const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema ({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'Please provide the full name.']
    },
    adress: {
        type: String,
        required: [true, 'Please provide an adress.']
    },
    email: {
        type: String,
        required: [true, 'Please provide an e-mail.'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Please provide a phone number.'],
        unique: true
    }
})

module.exports = mongoose.model('clients', clientSchema)