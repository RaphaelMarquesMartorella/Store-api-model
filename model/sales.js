const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
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
  },
  {
    timestamps: true,
  }
);

saleSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("clientId")) {
    this.saleId = new mongoose.Types.ObjectId();
  }
  next();
});

module.exports = mongoose.model("sales", saleSchema);
