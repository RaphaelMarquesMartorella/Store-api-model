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
exports.deleteSale = exports.updateSale = exports.getOneSale = exports.getSales = exports.createSales = void 0;
const Sales = require("../model/sales");
const Stock = require("../model/stock");
const Client = require("../model/client");
const Product = require("../model/product");
const createSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, productId } = req.body;
    try {
        const products = yield Product.find({
            productId: { $in: productId },
        }).exec();
        const allProductsExist = productId.every((id) => products.some((product) => product.productId.equals(id)));
        if (!allProductsExist) {
            return res.status(404).json({
                error: "One or more productIds do not exist in the products database.",
            });
        }
        const client = yield Client.findOne({ clientId }).exec();
        if (!client) {
            return res.status(404).json({ error: "There is no client with this clientId." });
        }
        let existingSale = yield Sales.findOne({ clientId }).exec();
        existingSale = new Sales({
            clientId: clientId,
            productId: [...productId],
        });
        yield existingSale.save();
        for (const productIdItem of productId) {
            const stock = yield Stock.findOne({ productId: productIdItem }).exec();
            if (stock && stock.stockNumber > 0) {
                stock.stockNumber--;
                yield stock.save();
            }
        }
        res
            .status(201)
            .json({ message: "Sale created successfully!", sale: existingSale });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "It was not possible to create this sale." });
    }
});
exports.createSales = createSales;
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Sales.find({});
        res.json({ allSales: response }).status(200);
    }
    catch (error) {
        console.log(error);
        res.json({ error: "It was not possible to get the sales." }).status(500);
    }
});
exports.getSales = getSales;
const getOneSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Sales.findById({ _id: req.params.id });
        res.json(response).status(200);
    }
    catch (error) {
        console.log(error);
        res.json({ error: "It was not possible to get this sale." }).status(500);
    }
});
exports.getOneSale = getOneSale;
const updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, productId } = req.body;
    try {
        const products = yield Product.find({
            productId: { $in: productId },
        }).exec();
        let existingSale = yield Sales.findById({ _id: req.params.id }).exec();
        if (!existingSale) {
            return res.status(404).json({ message: "Sale not found." });
        }
        else {
            const allProductsExist = productId.every((id) => products.some((product) => product.productId.equals(id)));
            if (!allProductsExist) {
                return res
                    .status(404)
                    .json({
                    error: "One or more productIds do not exist in the products database.",
                });
            }
            const existingProductIds = existingSale.productId.map(String);
            const newProductIds = productId.map(String);
            const hasChanges = !existingSale.clientId.equals(clientId) ||
                existingSale.productId.length !== productId.length ||
                existingProductIds.some((id) => !newProductIds.includes(id));
            if (!hasChanges) {
                return res
                    .status(300)
                    .json({
                    error: "There were no changes. Therefore, it was not possible to update.",
                });
            }
            existingSale.clientId = clientId;
            existingSale.productId = productId;
            yield existingSale.save();
            res
                .status(200)
                .json({ message: "Your update was successful!", Sales: existingSale });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not update this sale." });
    }
});
exports.updateSale = updateSale;
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Sales.findByIdAndDelete({ _id: req.params.id });
        if (response) {
            res.json({ message: "The removal was successfull." }).status(200);
        }
        else {
            res.json("It was not possible to delete this sale.").status(200);
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: "It was not possible to delete this sale." }).status(500);
    }
});
exports.deleteSale = deleteSale;
