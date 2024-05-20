const mongoose = require('mongoose');

let bagSchema = mongoose.Schema({
    name: String,
    price: Number,
});

const bag = mongoose.model('bag', bagSchema);
module.exports = bag;