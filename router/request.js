const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
  createRequestPerClient,
  createRequest,
  getOneRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} = require('../controllers/Request');

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
router.post('/request', authMiddleware, createRequest);

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
router.post('/request/client',authMiddleware, createRequestPerClient);

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
router.get('/request/:id',authMiddleware, getOneRequest);

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
router.get('/requests',authMiddleware, getRequests);

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
router.patch('/request/:id',authMiddleware, updateRequest);

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
router.delete('/request/:id',authMiddleware, deleteRequest);

module.exports = router;
