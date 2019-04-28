const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

//Schema is layout of the object
//Model is object itself

module.exports = mongoose.model('Product', productSchema);