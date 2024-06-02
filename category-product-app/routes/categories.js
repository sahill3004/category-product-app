const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    res.render('categories/index', { categories: result.rows });
});

router.get('/new', (req, res) => {
    res.render('categories/new');
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
    res.redirect('/categories');
});

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    res.render('categories/edit', { category: result.rows[0] });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name, id]);
    res.redirect('/categories');
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);

    
    await pool.query("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))");

    res.redirect('/categories');
});

module.exports = router;
