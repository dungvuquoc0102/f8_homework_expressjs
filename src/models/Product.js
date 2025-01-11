import mongoose from "mongoose";

const schemaOptions = {
  versionKey: false,
  timestamps: true,
};
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String },
    isHidden: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  schemaOptions,
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
