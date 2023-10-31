"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    saleId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: new mongoose_1.default.Types.ObjectId(),
        unique: true
    },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "clients",
    },
    productId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "products",
        },
    ],
}, {
    timestamps: true,
});
saleSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("clientId") || this.isModified("productId")) {
        this.saleId = new mongoose_1.default.Types.ObjectId();
    }
    next();
});
module.exports = mongoose_1.default.model("sales", saleSchema);
