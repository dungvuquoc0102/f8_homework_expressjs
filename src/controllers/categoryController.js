import Category from "../models/Category.js";
import {
  handleCreatedResponse,
  handleInvalidRequestError,
  handleServerError,
  handleSucessResponse,
} from "../utils/httpResponses.js";

const categoryController = {
  getAllCategories: async (_, res) => {
    try {
      const categories = await Category.find();
      handleSucessResponse(res, categories);
    } catch (error) {
      handleServerError(res, error);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleInvalidRequestError(res);
      }
      const category = await Category.findById(id);
      if (!category) {
        handleInvalidRequestError(res);
      }
      handleSucessResponse(res, category);
    } catch (error) {
      handleServerError(res, error);
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      if (!category) {
        handleInvalidRequestError(res);
      }
      handleCreatedResponse(res, category);
    } catch (error) {
      handleServerError(res, error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleInvalidRequestError(res);
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
        handleInvalidRequestError(res);
      }
      handleSucessResponse(res, category);
    } catch (error) {
      handleServerError(res, error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleInvalidRequestError(res);
      }
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        handleInvalidRequestError(res);
      }
      handleSucessResponse(res, category);
    } catch (error) {
      handleServerError(res, error);
    }
  },
};

export default categoryController;
