const express = require("express");
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Jeffaw Delivery Services' }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/carts', require('./routes/carts'));

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));