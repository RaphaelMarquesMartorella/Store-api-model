"use strict";
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
    },
    apis: ['./router/client.ts', './router/product.ts', './router/sales.ts', './router/stock.ts', './router/request.ts'],
};
const specs = swaggerJsdoc(options);
module.exports = specs;
