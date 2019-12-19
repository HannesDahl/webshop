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
        db.all(`SELECT * FROM products LIMIT 10`, (err, products) => {
            if (err) {
                console.error(err.message);
            }
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

app.listen(port, () => console.log(`Webshop open on port ${port}!`));