import mongoose from "mongoose";

const schemaOptions = {
  versionKey: false,
  timestamps: true,
};
const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isHidden: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  schemaOptions,
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
