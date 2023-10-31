import express from "express";
const app = express();
require('dotenv').config();
const cors = require('cors');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

app.use(cors());
app.use(express.json());

const connectDB = require('./db/connection');

const clientRouter = require('./router/client');
const productRouter = require('./router/product');
const saleRouter = require('./router/sales');
const stockRouter = require('./router/stock');
const requestRouter = require('./router/request');

app.use('/api/v1/', clientRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', saleRouter);
app.use('/api/v1/', stockRouter);
app.use('/api/v1/', requestRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log('Server listening on port ' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
