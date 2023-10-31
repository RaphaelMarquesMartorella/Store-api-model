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
const { createClient, getClients, getOneClient, updateClient, deleteClient, } = require('../controllers/Client');
const router = express.Router();
/**
 * @swagger
 * /api/v1/client:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               adress:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Server error
 */
router.post('/client', createClient);
/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 *       500:
 *         description: Server error
 */
router.get('/clients', getClients);
/**
 * @swagger
 * /api/v1/client/{id}:
 *   get:
 *     summary: Get a single client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Client ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Client details
 *       500:
 *         description: Server error
 */
router.get('/client/:id', getOneClient);
/**
 * @swagger
 * /api/v1/client/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Client ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               adress:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated client details
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.put('/client/:id', updateClient);
/**
 * @swagger
 * /api/v1/client/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Client ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/client/:id', deleteClient);
module.exports = router;
