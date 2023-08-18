const express = require('express');
const authMiddleware = require('../middleware/auth')

const {
  createClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
} = require('../controllers/Client');

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
router.post('/client',authMiddleware, createClient);


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
router.get('/clients',authMiddleware, getClients);

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
router.get('/client/:id',authMiddleware, getOneClient);

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
router.put('/client/:id',authMiddleware, updateClient);


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
router.delete('/client/:id',authMiddleware, deleteClient);

module.exports = router;
