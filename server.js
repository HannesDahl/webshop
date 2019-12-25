const express = require('express')
const formidable = require('express-formidable');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3000;
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: path.join('./public/images/'),
    multiples: true,
    keepExtensions: true
}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.get('/c/:category', function (req, res) {
    let categoryName = req.params.category;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {
            if (err) console.error(err.message)

            let categoryId = row.id;

            db.all(`SELECT * FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`, [categoryId], (err, products) => {
                if (err) {
                    console.error(err.message);
                }
                res.render('pages/index', {
                    products: products
                })
            });
            db.close((err) => {
                if (err) console.error(err.message);
                console.log('Closed the database connection.');
            });
        });
    });
});

app.get('/s/:searchinput', function (req, res) {
    let searchInput = req.params.searchinput;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products WHERE name LIKE '%${searchInput}%'`, (err, products) => {
            if (err) console.error(err.message);
            res.render('pages/search-results', {
                products: products
            });
        });
    });

    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products ORDER BY random() LIMIT 8`, (err, products) => {
            if (err) console.error(err.message);

            res.render('pages/index', {
                products: products
            })
        });
    });
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/adminpage/productlist', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products`, (err, products) => {
            if (err) console.error(err.message);

            res.render('pages/adminpage', {
                products: products
            });
        });
    });
    db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/adminpage/addproduct', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM categories`, (err, categories) => {
            if (err) console.error(err.message);

            res.render('pages/addproduct', {
                categories: categories
            });
        });
    });

    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/adminpage/dashboard', function (req, res) {
    res.render('pages/dashboard');
});

app.post('/addproduct', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database');
    });

    let productvals = [req.fields.name, JSON.parse(req.fields.price), req.fields.description, req.files.image.path.replace(/^.*[\\\/]/, '', /["']/g, "")];
    db.serialize(() => {
        db.run(`INSERT INTO products (name, price, description, image) VALUES(?, ?, ?, ?)`, productvals, function (err) {
            if (err) console.error(err);

            let categories = req.fields.selectedCategories.replace(/,/g, "")
            for (let i = 0; i < categories.length; i++) {
                db.run(`INSERT INTO product_categories (product_id, category_id) VALUES(?, ?)`, this.lastID, categories[i], function (err) {
                    if (err) console.error(err.message);
                    console.log(`A row has inserted with rowid ${this.lastID}`);
                });
            }

            res.json({
                answer: `Product name: ${req.fields.name}, Price: ${req.fields.price}, Description: ${req.fields.description}, Thumbnail: ${req.files.image.path.replace(/^.*[\\\/]/, '', /["']/g, "")}`
            });
        });
    });
});

app.get('/p/:product', function (req, res) {
    let productUrl = req.params.product;
    let productName = productUrl.replace(/_/g, " ")

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT * FROM products WHERE name = ?`, [productName], (err, product) => {
            if (err) console.error(err.message);

            res.render('pages/product-page', {
                product: product
            })
        });
    });

    db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/login', function (req, res) {
    res.render('pages/login')
});

app.get('/signup', function (req, res) {
    res.render('pages/signup')
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));