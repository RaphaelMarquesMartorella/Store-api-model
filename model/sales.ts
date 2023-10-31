import mongoose from "mongoose"

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
  },
  {
    timestamps: true,
  }
);

saleSchema.pre("save", function (next:any) {
  if (this.isNew || this.isModified("clientId") || this.isModified("productId")) {
    this.saleId = new mongoose.Types.ObjectId();
  }
  next();
});

module.exports = mongoose.model("sales", saleSchema);
