const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
  createSales,
  getSales,
  getOneSale,
  updateSale,
  deleteSale,
} = require('../controllers/Sales');

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API endpoints for managing sales
 */

/**
 * @swagger
 * /api/v1/sale:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 format: ObjectId  # Change this to ObjectId
 *               productId:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId  # Change this to ObjectId
 *             required:
 *               - clientId
 *               - productId
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       404:
 *         description: Client or product not found
 *       500:
 *         description: Server error
 */
router.post('/sale',authMiddleware, createSales);

/**
 * @swagger
 * /api/v1/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of all sales
 *       500:
 *         description: Server error
 */
router.get('/sales',authMiddleware, getSales);

/**
 * @swagger
 * /api/v1/sale/{id}:
 *   get:
 *     summary: Get a single sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Sale ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sale details
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 */
router.get('/sale/:id',authMiddleware, getOneSale);

/**
 * @swagger
 * /api/v1/sale/{id}:
 *   put:
 *     summary: Update a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Sale ID
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 format: ObjectId
 *               productId:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *             required:
 *               - clientId
 *               - productId
 *     responses:
 *       200:
 *         description: Updated sale details
 *       300:
 *         description: No changes to update
 *       404:
 *         description: Sale not found or product not in database
 *       500:
 *         description: Server error
 */
router.put('/sale/:id',authMiddleware, updateSale);

/**
 * @swagger
 * /api/v1/sale/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Sale ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 */
router.delete('/sale/:id',authMiddleware, deleteSale);

module.exports = router;
