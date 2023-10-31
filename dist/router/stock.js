"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express.Router();
const { createStock, getStock, getAllStock, updateStock, deleteStock, } = require('../controllers/Stock');
/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: API endpoints for managing stock
 */
/**
 * @swagger
 * /api/v1/stock:
 *   post:
 *     summary: Create or update stock for a product
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               stockNumber:
 *                 type: number
 *             required:
 *               - productId
 *               - stockNumber
 *     responses:
 *       201:
 *         description: Stock created/updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post('/stock', createStock);
/**
 * @swagger
 * /api/v1/stock/{id}:
 *   get:
 *     summary: Get stock for a product by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stock ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Stock details
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Server error
 */
router.get('/stock/:id', getStock);
/**
 * @swagger
 * /api/v1/allStock:
 *   get:
 *     summary: Get all stock information
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: List of all stock
 *       500:
 *         description: Server error
 */
router.get('/allStock', getAllStock);
/**
 * @swagger
 * /api/v1/stock/{id}:
 *   put:
 *     summary: Update stock for a product by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stock ID
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               stockNumber:
 *                 type: number
 *             required:
 *               - productId
 *               - stockNumber
 *     responses:
 *       200:
 *         description: Updated stock details
 *       404:
 *         description: Stock not found or product not in database
 *       500:
 *         description: Server error
 */
router.put('/stock/:id', updateStock);
/**
 * @swagger
 * /api/v1/stock/{id}:
 *   delete:
 *     summary: Delete stock for a product by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stock ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Stock deleted successfully
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Server error
 */
router.delete('/stock/:id', deleteStock);
module.exports = router;
