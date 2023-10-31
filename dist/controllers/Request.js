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
exports.deleteRequest = exports.updateRequest = exports.getRequests = exports.getOneRequest = exports.createRequest = exports.createRequestPerClient = void 0;
const Request = require("../model/request");
const Sales = require("../model/sales");
const createRequestPerClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { saleId, status, clientId } = req.body;
    try {
        const existingSales = yield Sales.find({ clientId });
        if (existingSales.length > 0) {
            const productIds = existingSales.flatMap((sale) => sale.productId);
            const quantity = productIds.length;
            const existingRequest = yield Request.findOne({ saleId });
            if (!existingRequest) {
                const newRequest = new Request({
                    saleId,
                    status,
                    quantity,
                    productId: productIds,
                    clientId,
                });
                yield newRequest.save();
                res.json(newRequest).status(201);
            }
            else {
                res
                    .json({ error: "There is already a request with this saleId." })
                    .status(404);
            }
        }
        else {
            res
                .json({ error: "Could not find any sales that match the clientId." })
                .status(404);
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: "It was not possible to create a request." }).status(500);
    }
});
exports.createRequestPerClient = createRequestPerClient;
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { saleId, status } = req.body;
    try {
        let existingSale = yield Sales.findOne({ saleId });
        const existingRequest = yield Request.findOne({ saleId });
        if (existingSale) {
            let quantity = existingSale.productId.length;
            if (!existingRequest) {
                const newRequest = new Request({
                    saleId,
                    clientId: existingSale.clientId,
                    productId: existingSale.productId,
                    status,
                    quantity,
                });
                yield newRequest.save();
                res.json({ message: "Request created successfully!", Request: newRequest }).status(200);
            }
            else {
                res
                    .json({ error: "There is already a request for the sale." })
                    .status(404);
            }
        }
        else {
            res.json({ error: 'There is no sale with this saleId.' });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: "It was not possible to create a request." }).status(500);
    }
});
exports.createRequest = createRequest;
const getOneRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRequest = yield Request.findById(req.params.id);
        res.json({ existingRequest }).status(200);
    }
    catch (error) {
        res.json({ error: "It was not possible to get this request." }).status(500);
    }
});
exports.getOneRequest = getOneRequest;
const getRequests = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRequests = yield Request.find();
        res.json({ allRequests }).status(200);
    }
    catch (error) {
        res.json({ error: "It was not possible to get all requests." }).status(500);
    }
});
exports.getRequests = getRequests;
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    try {
        let existingRequest = yield Request.findById(req.params.id);
        if (existingRequest) {
            existingRequest.status = status;
            yield existingRequest.save();
            res.json(existingRequest).status(200);
        }
        else {
            res.json({ error: "There is not item that match this id." }).status(404);
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: "It was not possible to update." }).status(500);
    }
});
exports.updateRequest = updateRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Request.findByIdAndDelete({ _id: req.params.id });
        if (response) {
            res.json({ message: "The removal was successfull." }).status(200);
        }
        else {
            res.json("There is no request to remove.").status(404);
        }
    }
    catch (error) {
        console.log(error);
        res
            .json({ error: "It was not possible to delete this request." })
            .status(500);
    }
});
exports.deleteRequest = deleteRequest;
