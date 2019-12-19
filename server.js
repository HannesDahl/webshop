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

app.get('/', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
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
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.get('/addproduct', function (req, res) {
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
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
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

            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.json({
                answer: `Product name: ${req.fields.name}, Price: ${req.fields.price}, Description: ${req.fields.description}, Thumbnail: ${req.files.image.path.replace(/^.*[\\\/]/, '', /["']/g, "")}`
            });
        });

        let categoriesvals = [null, req.fields.check];
        db.run(`INSERT INTO product_categories (product_id, category_id) VALUES(?, ?)`, categoriesvals, function (err) {
            if (err) console.error(err.message);
            console.log(`A row has inserted with rowid ${this.lastID}`);
        });
    });
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));