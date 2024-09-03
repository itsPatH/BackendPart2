import { ProductService } from "../services/services.js";
import { makeid } from "../utils.js";
import getErrorDetails from "../services/errorService.js";

const origin = "product";

const handleError = (res, errorCode) => {
  const { errorName, httpCode, message } = getErrorDetails(errorCode, origin);
  return res.status(httpCode).send({ status: "error", error: errorName, message });
};

const create = async (req, res) => {
  const { title, description, price, status = true, stock = 1, category = "Generic" } = req.body;

  if (!title || !description || price == null) {
    return res.status(400).send({ status: "error", error: "Incomplete values" });
  }

  if (typeof price !== "number" || isNaN(price)) {
    return res.status(400).send({ status: "error", error: "Price must be a number" });
  }

  if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
    return res.status(400).send({ status: "error", error: "Stock must be a non-negative number" });
  }

  if (typeof status !== "boolean") {
    return res.status(400).send({ status: "error", error: "Status must be a boolean" });
  }

  if (typeof category !== "string") {
    return res.status(400).send({ status: "error", error: "Category must be a string" });
  }

  const newProduct = {
    title,
    description,
    code: `${title.replace(/\s+/g, "")}_${makeid(6)}`,
    price,
    status,
    stock,
    category,
  };

  try {
    const productResult = await ProductService.createProduct(newProduct);
    res.send({ status: "success", message: "Product Created", product: productResult });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};


const get = async (req, res) => {
  const { page = 1 } = req.params;

  try {
    const paginationData = await ProductService.getPaginatedProducts(page);
    const { hasPrevPage, hasNextPage, prevPage, nextPage, page: currentPage, docs: products } = paginationData;

    const pagination = {
      totalPages: paginationData.totalPages,
      prevPage: hasPrevPage ? prevPage : null,
      nextPage: hasNextPage ? nextPage : null,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `?page=${prevPage}` : null,
      nextLink: hasNextPage ? `?page=${nextPage}` : null,
    };

    res.status(200).send({ status: "success", payload: products, pagination });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};


const getById = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const foundProduct = await ProductService.getProductById(productId);

    if (!foundProduct) {
      return handleError(res, -2);
    }

    res.send({ status: "success", payload: foundProduct });
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { id: productId } = req.params;
  const updatedValues = req.body;

  if (updatedValues.price != null && (typeof updatedValues.price !== "number" || isNaN(updatedValues.price))) {
    return res.status(400).send({ status: "error", error: "Price must be a number" });
  }

  if (updatedValues.stock != null && (typeof updatedValues.stock !== "number" || isNaN(updatedValues.stock) || updatedValues.stock < 0)) {
    return res.status(400).send({ status: "error", error: "Stock must be a non-negative number" });
  }

  if (updatedValues.status != null && typeof updatedValues.status !== "boolean") {
    return res.status(400).send({ status: "error", error: "Status must be a boolean" });
  }

  if (updatedValues.category != null && typeof updatedValues.category !== "string") {
    return res.status(400).send({ status: "error", error: "Category must be a string" });
  }

  try {
    const foundProduct = await ProductService.getProductById(productId);

    if (!foundProduct) {
      return handleError(res, -2); // Product not found
    }

    await ProductService.updateById({ _id: productId }, { $set: updatedValues });

    res.send({ status: "success", payload: { oldValues: foundProduct, newValues: updatedValues } });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

const deleteById = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const foundProduct = await ProductService.getProductById(productId);

    if (!foundProduct) {
      return handleError(res, -2);
    }

    await ProductService.deleteProduct(productId);

    res.send({ status: "success", message: "Product deleted successfully", payload: foundProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

export default {
  create,
  get,
  getById,
  update,
  deleteById,
};