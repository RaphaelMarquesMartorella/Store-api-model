"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    requestId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: new mongoose_1.default.Types.ObjectId(),
        ref: 'sales',
        unique: true
    },
    saleId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'sales'
    },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'clients'
    },
    productId: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'products'
        }],
    status: {
        type: String
    },
    quantity: {
        type: Number
    },
}, {
    timestamps: true
});
module.exports = mongoose_1.default.model('requests', requestSchema);
