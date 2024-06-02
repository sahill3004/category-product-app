const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pool = require('./db');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

app.use('/', indexRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
