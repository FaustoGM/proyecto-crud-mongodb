TP Back End – API CRUD (Node + Express + MongoDB)

API básica con CRUD de Usuarios, Categorías y Productos. Los productos tienen una categoría (se usa populate). Las rutas de crear/editar/borrar usan JWT.

Requisitos

Node.js

MongoDB (local o Docker)

(Opcional) VS Code con extensión REST Client

Cómo correr

Crear archivo .env en la raíz (copiar esto):

PORT=3000 MONGODB_URI=mongodb://localhost:27017/tp_crud JWT_SECRET=un-secreto-largo-y-dificil JWT_EXPIRES=1h

Instalar dependencias:

npm i

Iniciar:

npm run dev

Probar :

Abrir: http://localhost:3000/ → debe mostrar ok.

Mongo en Docker: docker run -d --name tp_mongo -p 27017:27017 -v mongo_data:/data/db mongo:7

Endpoints Auth / Users

POST /api/users/register → { name, email, password, role? }

POST /api/users/login → { email, password } → devuelve { token, user }

Categorias

GET /api/categories

GET /api/categories/:id

POST /api/categories (JWT)

PATCH /api/categories/:id (JWT)

DELETE /api/categories/:id (JWT)

Productos

GET /api/products?search=&minPrice=&maxPrice=&page=&limit=

GET /api/products/:id

POST /api/products (JWT)

PATCH /api/products/:id (JWT)

DELETE /api/products/:id (JWT)

Ejemplos rápidos (JSON)

Registro

{ "name": "Admin", "email": "admin@test.com", "password": "123456" }

Login

{ "email": "admin@test.com", "password": "123456" }

Crear categoría

{ "name": "Bebidas", "description": "Línea de bebidas" }

Crear producto

{ "name": "Agua mineral 500ml", "description": "Sin gas", "price": 800, "stock": 120, "category": "<ObjectId de una categoría existente>" }

requests.http (para VS Code)

Crear un archivo requests.http en la raíz, pegar y ejecutar en orden con Send Request.

@HOST=http://localhost:3000

register
POST {{HOST}}/api/users/register Content-Type: application/json

{ "name": "Admin", "email": "admin@test.com", "password": "123456" }

login
POST {{HOST}}/api/users/login Content-Type: application/json

{ "email": "admin@test.com", "password": "123456" }

createCategory
POST {{HOST}}/api/categories Authorization: Bearer {{login.response.body.token}} Content-Type: application/json

{ "name": "Bebidas", "description": "Línea de bebidas" }

createProduct
POST {{HOST}}/api/products Authorization: Bearer {{login.response.body.token}} Content-Type: application/json

{ "name": "Agua mineral 500ml", "description": "Sin gas", "price": 800, "stock": 120, "category": "{{createCategory.response.body.data._id}}" }

listProducts
GET {{HOST}}/api/products
