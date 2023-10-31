"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: new mongoose_1.default.Types.ObjectId(),
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
});
module.exports = mongoose_1.default.model('clients', clientSchema);
