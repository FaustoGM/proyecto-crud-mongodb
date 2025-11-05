const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./src/config/db');

const productRoute = require('./src/routes/productRoute');
const categoryRoute = require('./src/routes/categoryRoute');
const userRoute = require('./src/routes/userRoute');

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API CRUD MongoDB - TP Back End' });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
});
