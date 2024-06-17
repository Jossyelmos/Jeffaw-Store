const express = require("express");
const config = require('config');
const connectDB = require('./config/db');
const Stripe = require('stripe');
const stripe_secret_key = config.get('stripe_secret_key');
const FRONTEND_URL = config.get('frontend_url');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Welcome to Jeffaw Delivery Services' }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/carts', require('./routes/carts'));

// Payment Gateway...
const stripe = new Stripe(stripe_secret_key);

app.post('/checkout-payment', async (req, res) => {
    console.log(req.body)

    try {
        
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [{ shipping_rate: 'shr_1OoAfQDgRkBhUUI20B1QoHdk' }],
            
            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: item.title,
                            images: [item.image]
                        },
                        unit_amount: item.price * 100, 
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity : item.quantity
                }
            }),

            success_url: `${FRONTEND_URL}/success`,
            cancel_url: `${FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)

    } catch (error) {
        res.status(err.statusCode || 500).json(err.message)
    }

})

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));