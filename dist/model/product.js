"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: new mongoose_1.default.Types.ObjectId(),
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
});
module.exports = mongoose_1.default.model('products', productSchema);
