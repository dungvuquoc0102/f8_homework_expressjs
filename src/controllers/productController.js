import Category from "../models/Category.js";
import Product from "../models/Product.js";
import {
  handleSucessResponse,
  handleCreatedResponse,
  handleInvalidRequestError,
  handleNotFoundError,
  handleServerError,
} from "../utils/httpResponses.js";

export const getAllProducts = async (_, res, next) => {
  try {
    const products = await Product.find().populate("categoryId");
    handleSucessResponse(res, products);
  } catch (error) {
    next();
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      handleInvalidRequestError(res);
    }
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
    );
    if (!product) {
      return handleNotFoundError(res);
    }
    handleSucessResponse(res, product);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      let category = await Category.findOne({ title: "Uncategorized" });
      if (!category) {
        category = await Category.create({ title: "Uncategorized" });
      }
      req.body.categoryId = category._id;
    }
    const product = await Product.create(req.body);
    if (!product) {
      handleInvalidRequestError(res);
    }
    await Category.findByIdAndUpdate(categoryId, {
      $push: { products: product._id },
    });
    handleCreatedResponse(res, product);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, price, categoryId, description } = req.body;
    const { id } = req.params;
    if (!id) {
      return handleInvalidRequestError(res);
    }

    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
      return handleNotFoundError(res);
    }

    let product;
    if (title || price || categoryId || description) {
      product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (oldProduct.categoryId !== categoryId) {
        await Category.findByIdAndUpdate(oldProduct.categoryId, {
          $pull: { products: id },
        });
        await Category.findByIdAndUpdate(categoryId, {
          $push: { products: id },
        });
      }
    } else {
      product = await Product.findByIdAndUpdate(
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
    if (!product) {
      return handleNotFoundError(res);
    }
    handleSucessResponse(res, product);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleInvalidRequestError(res);
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return handleNotFoundError(res);
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: { products: id },
    });
    handleSucessResponse(res, product);
  } catch (error) {
    handleServerError(res, error);
  }
};
