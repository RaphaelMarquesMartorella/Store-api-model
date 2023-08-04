const express = require('express');

const router = express.Router();

const {
    createRequest,
    getOneRequest,
    getRequests,
    deleteRequest,
    updateRequest
} = require('../controllers/Request')

router.post('/request', createRequest)
router.get('/request/:id', getOneRequest).get('/requests', getRequests)
router.delete('/request/:id', deleteRequest)
router.patch('/request/:id', updateRequest)

module.exports = router