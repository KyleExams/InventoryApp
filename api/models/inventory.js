const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Inventory = new schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Inventory', Inventory);