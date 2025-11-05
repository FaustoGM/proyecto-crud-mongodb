const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function register(data) {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw { status: 409, message: 'El email ya está registrado' };
  const user = await User.create(data); // password se hashea en pre-save
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: 'Credenciales inválidas' };
  const ok = await user.comparePassword(password);
  if (!ok) throw { status: 401, message: 'Credenciales inválidas' };

  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
}

module.exports = { register, login };
