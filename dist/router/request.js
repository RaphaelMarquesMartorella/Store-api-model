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
const { createRequestPerClient, createRequest, getOneRequest, getRequests, updateRequest, deleteRequest, } = require('../controllers/Request');
/**
 * @swagger
 * tags:
 *   name: Request
 *   description: API endpoints for managing requests
 */
/**
 * @swagger
 * /api/v1/request:
 *   post:
 *     summary: Create a new request
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleId:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - saleId
 *               - status
 *
 *     responses:
 *       201:
 *         description: Request created successfully
 *       404:
 *         description: Sale not found or duplicate request
 *       500:
 *         description: Server error
 */
router.post('/request', createRequest);
/**
 * @swagger
 * /api/v1/request/client:
 *   post:
 *     summary: Create a new request per client
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleId:
 *                 type: string
 *               status:
 *                 type: string
 *               clientId:
 *                 type: string
 *             required:
 *               - saleId
 *               - status
 *               - clientId
 *     responses:
 *       201:
 *         description: Request created successfully
 *       404:
 *         description: No sales found for the client
 *       500:
 *         description: Server error
 */
router.post('/request/client', createRequestPerClient);
/**
 * @swagger
 * /api/v1/request/{id}:
 *   get:
 *     summary: Get a request by ID
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Request ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Request details
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.get('/request/:id', getOneRequest);
/**
 * @swagger
 * /api/v1/requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: List of all requests
 *       500:
 *         description: Server error
 */
router.get('/requests', getRequests);
/**
 * @swagger
 * /api/v1/request/{id}:
 *   patch:
 *     summary: Update the status of a request by ID
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Request ID
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Updated request details
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.patch('/request/:id', updateRequest);
/**
 * @swagger
 * /api/v1/request/{id}:
 *   delete:
 *     summary: Delete a request by ID
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Request ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.delete('/request/:id', deleteRequest);
module.exports = router;
