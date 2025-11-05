const Product = require('../models/productModel');

async function createProduct(data) {
  
  if (data.price < 0 || data.stock < 0) {
    throw { status: 400, message: 'price/stock no pueden ser negativos' };
  }
  const doc = await Product.create(data);
  return doc;
}

async function getProducts(query = {}) {
  const { search, minPrice, maxPrice, page = 1, limit = 10 } = query;
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  return { items, total, page: Number(page), limit: Number(limit) };
}

async function getProductById(id) {
  const doc = await Product.findById(id).populate('category');
  if (!doc) throw { status: 404, message: 'Producto no encontrado' };
  return doc;
}

async function updateProduct(id, data) {
  const doc = await Product.findByIdAndUpdate(id, data, { new: true }).populate('category');
  if (!doc) throw { status: 404, message: 'Producto no encontrado' };
  return doc;
}

async function deleteProduct(id) {
  const doc = await Product.findByIdAndDelete(id);
  if (!doc) throw { status: 404, message: 'Producto no encontrado' };
  return { message: 'Producto eliminado' };
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
