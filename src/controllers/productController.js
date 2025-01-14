import Category from "../models/Category.js";
import Product from "../models/Product.js";
import handleRes from "../utils/handleRes.js";

const productController = {
  getAllProducts: async (_, res, next) => {
    try {
      const products = await Product.find().populate("categoryId");
      handleRes.handleSucessResponse(res, products);
    } catch (error) {
      next();
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        handleRes.handleInvalidRequestError(res);
      }
      const product = await Product.findById(req.params.id).populate(
        "categoryId",
      );
      if (!product) {
        return handleRes.handleNotFoundError(res);
      }
      handleRes.handleSucessResponse(res, product);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  createProduct: async (req, res) => {
    try {
      console.log(req.body);
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
        handleRes.handleInvalidRequestError(res);
      }
      await Category.findByIdAndUpdate(categoryId, {
        $push: { products: product._id },
      });
      handleRes.handleCreatedResponse(res, product);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, categoryId, description } = req.body;
      const { id } = req.params;
      if (!id) {
        return handleRes.handleInvalidRequestError(res);
      }

      const oldProduct = await Product.findById(id);
      if (!oldProduct) {
        return handleRes.handleNotFoundError(res);
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
        return handleRes.handleNotFoundError(res);
      }
      handleRes.handleSucessResponse(res, product);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return handleRes.handleInvalidRequestError(res);
      }
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return handleRes.handleNotFoundError(res);
      }
      await Category.findByIdAndUpdate(product.categoryId, {
        $pull: { products: id },
      });
      handleRes.handleSucessResponse(res, product);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
};

export default productController;
