"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStock = exports.updateStock = exports.getAllStock = exports.getStock = exports.createStock = void 0;
const Stock = require("../model/stock");
const Product = require("../model/product");
const createStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, stockNumber } = req.body;
    try {
        const existingProduct = yield Product.findOne({ productId });
        const existingStock = yield Stock.findOne({ productId }).exec();
        if (existingProduct) {
            if (existingStock) {
                existingStock.stockNumber += stockNumber;
                yield existingStock.save();
                res.status(201).json(existingStock);
            }
            else {
                const newStock = new Stock({
                    productId,
                    stockNumber,
                });
                yield newStock.save();
                res.status(201).json({ message: "Stock created successfully!", Stock: newStock });
            }
        }
        else {
            res
                .status(404)
                .json({ error: "There is no product with this productId." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "It was not possible to create the stock." });
    }
});
exports.createStock = createStock;
const getStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield Stock.findById(req.params.id);
        if (stock) {
            res.json(stock).status(200);
        }
        else {
            res.json({ error: "Could not find this stock" }).status(200);
        }
    }
    catch (error) {
        res.json({ error: 'It was not possible  to get this stock.' }).status(500);
        console.log(error);
    }
});
exports.getStock = getStock;
const getAllStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allStock = yield Stock.find();
        let totalStock = 0;
        for (let index = 0; index < allStock.length; index++) {
            const stockItem = allStock[index];
            totalStock += stockItem.stockNumber;
        }
        res.json({ totalStock, allStock }).status(200);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to get stock data." });
    }
});
exports.getAllStock = getAllStock;
const updateStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, stockNumber } = req.body;
    try {
        let existingProduct = null;
        if (productId) {
            existingProduct = yield Product.findOne({ productId });
            if (!existingProduct) {
                return res.json({ error: "There is no product with this productId." }).status(404);
            }
        }
        let existingStock = yield Stock.findById(req.params.id).exec();
        if (!existingStock) {
            return res.json({ error: "Stock not found." }).status(404);
        }
        if (productId && !existingStock.productId.equals(productId)) {
            existingStock.productId = productId;
        }
        if (stockNumber && existingStock.stockNumber !== stockNumber) {
            existingStock.stockNumber += stockNumber;
        }
        if (existingStock.isModified("productId") || existingStock.isModified("stockNumber")) {
            yield existingStock.save();
            return res.json(existingStock).status(200);
        }
        else if (productId && !existingStock.productId.equals(productId)) {
            return res.json({ message: "The productId was updated." }).status(200);
        }
        else if (stockNumber && existingStock.stockNumber !== stockNumber) {
            return res.json({ message: "The stockNumber was updated." }).status(200);
        }
        else {
            return res.json({ message: "There was no change. Therefore it was not possible to update." }).status(200);
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ error: "It was not possible to update." }).status(500);
    }
});
exports.updateStock = updateStock;
const deleteStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Stock.findByIdAndDelete({ _id: req.params.id })
        .then((deletedStock) => {
        if (deletedStock) {
            res.json({ message: "Your removal was successfull!" }).status(200);
        }
        else {
            res.json({ error: "There is no item that match this id." }).status(404);
        }
    })
        .catch((error) => {
        console.log(error);
        res
            .json({ error: "It was not possible to delete this stock." })
            .status(500);
    });
});
exports.deleteStock = deleteStock;
module.exports = {
    createStock: exports.createStock,
    getStock: exports.getStock,
    getAllStock: exports.getAllStock,
    updateStock: exports.updateStock,
    deleteStock: exports.deleteStock,
};
