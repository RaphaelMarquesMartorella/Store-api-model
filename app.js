const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
require('express-async-errors');
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

const connectDB = require('./db/connection')

const clientRouter = require('./router/client')
const productRouter = require('./router/product')
const saleRouter = require('./router/sales')
const stockRouter = require('./router/stock')
const requestRouter = require('./router/request')


app.use('/api/v1/', clientRouter)
app.use('/api/v1/', productRouter)
app.use('/api/v1/', saleRouter)
app.use('/api/v1/', stockRouter)
app.use('/api/v1/', requestRouter)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, () => {
            console.log('Server listening on port 3000');
        })
    } catch (error) {
        console.log(error);
    }
}

start()
