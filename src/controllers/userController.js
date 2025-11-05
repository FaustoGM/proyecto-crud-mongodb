const userService = require('../services/userService');
const { handleController } = require('./helpers');

exports.register = handleController(async (req) => {
  const data = await userService.register(req.body);
  return { message: 'Usuario registrado', data };
});

exports.login = handleController(async (req) => {
  const { token, user } = await userService.login(req.body);
  return { message: 'Login ok', token, user };
});
