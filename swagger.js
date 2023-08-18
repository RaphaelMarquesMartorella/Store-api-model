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
  apis: ['./router/client.js', './router/product.js', './router/sales.js', './router/stock.js', './router/request.js'],
};
const specs = swaggerJsdoc(options);
module.exports = specs;
