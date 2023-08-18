const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')
const cors = require('cors');
const appExpress = express()
require('dotenv').config();
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

appExpress.use(cors());
appExpress.use(express.json());

const connectDB = require('./db/connection');

const clientRouter = require('./router/client');
const productRouter = require('./router/product');
const saleRouter = require('./router/sales');
const stockRouter = require('./router/stock');
const requestRouter = require('./router/request');
const authRouter = require('./router/auth')

appExpress.use('/api/v1/', clientRouter);
appExpress.use('/api/v1/', productRouter);
appExpress.use('/api/v1/', saleRouter);
appExpress.use('/api/v1/', stockRouter);
appExpress.use('/api/v1/', requestRouter);
appExpress.use('/auth', authRouter)

appExpress.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    appExpress.listen(PORT, () => {
      console.log('Server listening on port ' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer()

// const createWindow = () => {
//     const win = new BrowserWindow ({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js')
//         }
//     })
//     win.loadURL('http://localhost:3000')
// }

// app.whenReady().then(() => {
//     startServer()
//     createWindow()
//     app.on('activate', () => {
//         if(BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })

// app.on('window-all-closed', () => {
//     if(process.platform !== 'darwin') app.quit()
// })


