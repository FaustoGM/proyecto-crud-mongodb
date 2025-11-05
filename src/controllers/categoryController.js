const categoryService = require('../services/categoryService');
const { handleController } = require('./helpers');

exports.create = handleController(async (req) => {
  const doc = await categoryService.createCategory(req.body);
  return { message: 'Categoría creada', data: doc };
});

exports.list = handleController(async () => {
  const docs = await categoryService.getCategories();
  return { data: docs };
});

exports.getById = handleController(async (req) => {
  const doc = await categoryService.getCategoryById(req.params.id);
  return { data: doc };
});

exports.update = handleController(async (req) => {
  const doc = await categoryService.updateCategory(req.params.id, req.body);
  return { message: 'Categoría actualizada', data: doc };
});

exports.remove = handleController(async (req) => {
  const out = await categoryService.deleteCategory(req.params.id);
  return out;
});
