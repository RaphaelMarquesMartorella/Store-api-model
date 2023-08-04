const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    ref: 'sales',
    unique: true
  },
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sales'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients'
  },  
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  }],
  status: {
    type: String
  },
  quantity: {
    type: Number
  },
 
}, 
{
    timestamps:true
  });

module.exports = mongoose.model('requests', requestSchema);
