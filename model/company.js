const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please provide a password"],
  },
  CNPJ: {
    type: Number,
    minlength: 14,
    maxlength: 14,
    required: [true, "Please provide a CNPJ"],
    unique: true,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  clientId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
    },
  ],
  requestId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "requests",
    },
  ],
  saleId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sales'
  }],
});

module.exports = mongoose.model("companies", companySchema);
