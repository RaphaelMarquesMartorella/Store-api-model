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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('dotenv').config();
const cors = require('cors');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
app.use(cors());
app.use(express_1.default.json());
const connectDB = require('./db/connection');
const clientRouter = require('./router/client');
const productRouter = require('./router/product');
const saleRouter = require('./router/sales');
const stockRouter = require('./router/stock');
const requestRouter = require('./router/request');
app.use('/api/v1/', clientRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', saleRouter);
app.use('/api/v1/', stockRouter);
app.use('/api/v1/', requestRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const PORT = process.env.PORT || 3001;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log('Server listening on port ' + PORT);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
