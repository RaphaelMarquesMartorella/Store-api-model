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
exports.deleteProduct = exports.updateProduct = exports.getOneProduct = exports.getProducts = exports.createProduct = void 0;
const Product = require("../model/product");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName } = req.body;
    try {
        const existingProduct = yield Product.findOne({ productName });
        const response = yield Product.create(Object.assign({}, req.body));
        if (!existingProduct) {
            if (response) {
                res
                    .json({ message: "Product created successfully!", Product: response })
                    .status(201);
            }
            else {
                res.json("There was a problem.").status(500);
            }
        }
        else {
            res.json({ error: "This product was already added." });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = createProduct;
const getProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Product.find({});
        res.json({ allProducts: response }).status(200);
    }
    catch (error) {
        res.json({ error: "It was not possible to get the products." }).status(500);
        console.log(error);
    }
});
exports.getProducts = getProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Product.findById({ _id: req.params.id });
        res.json(response).status(200);
    }
    catch (error) {
        res.json({ error: "It was not possible to get this product." }).status(500);
        console.log(error);
    }
});
exports.getOneProduct = getOneProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(response).status(200);
    }
    catch (error) {
        res
            .json({ error: "It was not possible to update this product." })
            .status(500);
        console.log(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Product.findByIdAndRemove(req.params.id);
        if (response) {
            res.json("The removal was succesfull.").status(200);
        }
        else {
            res.json("There is no item that match this id.").status(500);
        }
    }
    catch (error) {
        res.json({ error: 'It was not possible to delete this product.' }).status(500);
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
