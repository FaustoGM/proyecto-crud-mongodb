const productService = require('../services/productService');
const { handleController } = require('./helpers');

exports.create = handleController(async (req) => {
  const doc = await productService.createProduct(req.body);
  return { message: 'Producto creado', data: doc };
});

exports.list = handleController(async (req) => {
  const data = await productService.getProducts(req.query);
  return data;
});

exports.getById = handleController(async (req) => {
  const doc = await productService.getProductById(req.params.id);
  return { data: doc };
});

exports.update = handleController(async (req) => {
  const doc = await productService.updateProduct(req.params.id, req.body);
  return { message: 'Producto actualizado', data: doc };
});

exports.remove = handleController(async (req) => {
  const out = await productService.deleteProduct(req.params.id);
  return out;
});
