const { Schema: Schema2, model: model2, Types } = require('mongoose');

const productSchema = new Schema2(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: Types.ObjectId, ref: 'Category', required: true }
  },
  { timestamps: true }
);

module.exports = model2('Product', productSchema);
