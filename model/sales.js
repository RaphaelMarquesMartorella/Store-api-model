const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
      unique: true
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies'
  }
  },
  {
    timestamps: true,
  }
);

saleSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("clientId") || this.isModified("productId")) {
    this.saleId = new mongoose.Types.ObjectId();
  }
  next();
});

module.exports = mongoose.model("sales", saleSchema);
