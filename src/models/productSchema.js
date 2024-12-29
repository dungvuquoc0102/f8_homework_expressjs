import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schemaOptions = {
  versionKey: false,
  timestamps: true,
};
const ProductSchema = new Schema(
  {
    title: String,
    price: Number,
  },
  schemaOptions
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
