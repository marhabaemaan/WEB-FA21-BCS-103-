const mongoose = require('mongoose');

const bagSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String // Add a 'category' field to distinguish between different categories of bags
});

const Bag = mongoose.model('Bag', bagSchema);
module.exports = Bag;
