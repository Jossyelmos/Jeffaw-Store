const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Cart = require('../models/Cart');

// @route  GET api/carts
// @desc  Get all user's carts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const carts = await Cart.find({ user: req.user.id }).sort({ date: -1 });
        res.json(carts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/carts
// @desc  Add new product to cart
// @access  Public
router.post(
    '/',
    [
        auth,
        [
            body('title', "Can't add a product to cart. Please add a title")
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, quantity, price, image } = req.body;

        try {
            const newCart = new Cart({
                title,
                quantity,
                price,
                image,
                user: req.user.id
            });

            const cart = await newCart.save();

            res.json(cart);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route  PUT api/carts/:id
// @desc  Update carts
// @access  Public
router.put('/:id', auth, async (req, res) => {
    const { title, quantity, price, image } = req.body;

    // Build cart object
    const cartFields = {};
    if (title) cartFields.title = title;
    if (quantity) cartFields.quantity = quantity;
    if (price) cartFields.price = price;
    if (image) cartFields.image = image;

    try {
        let cart = await Cart.findById(req.params.id);

        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        // Make sure user owns cart
        if (cart.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        };

        cart = await Cart.findByIdAndUpdate(req.params.id, { $set: cartFields }, { new: true });

        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/carts/:id
// @desc  Delete carts
// @access  Public
router.delete('/:id', auth, async (req, res) => {
    try {
        let cart = await Cart.findById(req.params.id);

        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        // Make sure user owns cart
        if (cart.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        };

        cart = await Cart.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;