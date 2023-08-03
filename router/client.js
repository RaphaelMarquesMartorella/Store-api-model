const express = require('express')
const {createClient,
    getClients,
    getOneClient, 
    updateClient,
    deleteClient} = require('../controllers/Client')

const router = express.Router()

router.post('/client', createClient)
router.get('/clients', getClients).get('/client/:id', getOneClient)
router.put('/client/:id', updateClient)
router.delete('/client/:id', deleteClient)

module.exports = router

