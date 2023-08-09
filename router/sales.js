const express = require('express');
const router = express.Router();
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
 * /api/v1/sales:
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
 *               productId:
 *                 type: array
 *                 items:
 *                   type: string
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
router.post('/sales', createSales);

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
router.get('/sales', getSales);

/**
 * @swagger
 * /api/v1/sales/{id}:
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
router.get('/sales/:id', getOneSale);

/**
 * @swagger
 * /api/v1/sales/{id}:
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
 *               productId:
 *                 type: array
 *                 items:
 *                   type: string
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
router.put('/sales/:id', updateSale);

/**
 * @swagger
 * /api/v1/sales/{id}:
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
router.delete('/sales/:id', deleteSale);

module.exports = router;
