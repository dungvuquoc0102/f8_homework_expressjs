import Category from "../models/Category.js";
import Product from "../models/Product.js";
import handleRes from "../utils/handleRes.js";

const categoryController = {
  getAllCategories: async (_, res) => {
    try {
      const categories = await Category.find();
      handleRes.handleSucessResponse(res, categories);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleRes.handleInvalidRequestError(res);
      }
      const category = await Category.findById(id);
      if (!category) {
        handleRes.handleInvalidRequestError(res);
      }
      handleRes.handleSucessResponse(res, category);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      if (!category) {
        handleRes.handleInvalidRequestError(res);
      }
      handleRes.handleCreatedResponse(res, category);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleRes.handleInvalidRequestError(res);
      }
      let category;
      if (req.body.title || req.body.description) {
        category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
        });
      } else {
        category = await Category.findByIdAndUpdate(
          id,
          {
            isHidden: true,
            deletedAt: Date.now(),
          },
          {
            new: true,
          },
        );
      }
      if (!category) {
        handleRes.handleInvalidRequestError(res);
      }
      handleRes.handleSucessResponse(res, category);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleRes.handleInvalidRequestError(res);
      }
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        handleRes.handleInvalidRequestError(res);
      }
      //get default category
      const defaultCategory = await Category.findOne({
        title: "Uncategorized",
      });
      const products = await Product.find({
        categoryId: id,
      });
      //change categoryId of product
      await Product.updateMany(
        {
          categoryId: id,
        },
        {
          $set: {
            categoryId: defaultCategory._id,
          },
        },
      );
      //update products of default category
      await Category.updateOne(
        {
          _id: defaultCategory._id,
        },
        {
          $push: {
            products: {
              $each: products.map((item) => item._id),
            },
          },
        },
      );
      handleRes.handleSucessResponse(res, category);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
};

export default categoryController;
