const Category = require('../models/categoryModel');

async function createCategory(data) {
  const exists = await Category.findOne({ name: data.name });
  if (exists) throw { status: 409, message: 'La categoría ya existe' };
  const doc = await Category.create(data);
  return doc;
}

async function getCategories() {
  return Category.find().sort({ createdAt: -1 });
}

async function getCategoryById(id) {
  const doc = await Category.findById(id);
  if (!doc) throw { status: 404, message: 'Categoría no encontrada' };
  return doc;
}

async function updateCategory(id, data) {
  const doc = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!doc) throw { status: 404, message: 'Categoría no encontrada' };
  return doc;
}

async function deleteCategory(id) {
  const doc = await Category.findByIdAndDelete(id);
  if (!doc) throw { status: 404, message: 'Categoría no encontrada' };
  return { message: 'Categoría eliminada' };
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
