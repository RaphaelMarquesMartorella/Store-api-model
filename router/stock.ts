import * as express from "express";
const router = express.Router();
const {
  createStock,
  getStock,
  getAllStock,
  updateStock,
  deleteStock,
} = require('../controllers/Stock');

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
