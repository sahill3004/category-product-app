const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const productQuery = `
        SELECT products.id AS productid, products.name AS productname, 
               categories.name AS categoryname, categories.id AS categoryid
        FROM products
        JOIN categories ON products.category_id = categories.id
        ORDER BY products.id
        LIMIT $1 OFFSET $2
    `;
    const countQuery = `SELECT COUNT(*) FROM products`;

    const [productResult, countResult] = await Promise.all([
        pool.query(productQuery, [pageSize, offset]),
        pool.query(countQuery)
    ]);

    const totalProducts = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.render('products/index', { 
        products: productResult.rows,
        currentPage: page,
        totalPages 
    });
});


router.get('/new', async (req, res) => {
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY id');
    res.render('products/new', { categories: categoriesResult.rows });
});


router.post('/', async (req, res) => {
    const { name, category_id } = req.body;
    await pool.query('INSERT INTO products (name, category_id) VALUES ($1, $2)', [name, category_id]);
    res.redirect('/products');
});


router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const productResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY id');
    res.render('products/edit', { 
        product: productResult.rows[0],
        categories: categoriesResult.rows
    });
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    await pool.query('UPDATE products SET name = $1, category_id = $2 WHERE id = $3', [name, category_id, id]);
    res.redirect('/products');
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.redirect('/products');
});

module.exports = router;
