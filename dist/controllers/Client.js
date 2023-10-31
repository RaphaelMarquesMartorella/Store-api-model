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
exports.deleteClient = exports.updateClient = exports.getOneClient = exports.getClients = exports.createClient = void 0;
const Client = require("../model/client");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, adress, email, phone } = req.body;
    const client = {
        fullName,
        adress,
        email,
        phone,
    };
    try {
        const existingEmail = yield Client.findOne({ email });
        const existingPhone = yield Client.findOne({ phone });
        if (existingEmail) {
            res.json({ error: "This email has already been registered." }).status(404);
        }
        if (existingPhone) {
            res.json({ error: "This phone has already been registered." }).status(404);
        }
        else {
            const response = yield Client.create(client);
            res.json({ message: "Client created successfully!", client: response }).status(200);
        }
    }
    catch (error) {
        console.log(error);
        console.log(req.body);
        res.status(500).json({ error: "Server error" });
    }
});
exports.createClient = createClient;
const getClients = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Client.find({});
        res.json({ allClients: response }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getClients = getClients;
const getOneClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Client.findById({ _id: req.params.id });
        res.json(response).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneClient = getOneClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, adress, email, phone } = req.body;
    const updatedClient = {
        fullName,
        adress,
        email,
        phone,
    };
    try {
        const response = yield Client.findByIdAndUpdate({ _id: req.params.id }, updatedClient, { new: true });
        if (!response) {
            return res.status(404).json({ error: "Client not found." });
        }
        res.json({ message: "Client updated successfully!", client: response }).status(200);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Client.findByIdAndRemove({ _id: req.params.id });
        if (response) {
            res.json("The removal was succesfull.").status(200);
        }
        else {
            res.json("There is no item that match this id.").status(500);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteClient = deleteClient;
