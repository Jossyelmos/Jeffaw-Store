const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('cart', CartSchema);