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
    var products = [{
            name: 'Ryzen 3 2200G',
            price: 110
        },
        {
            name: 'Ryzen 5 2600X',
            price: 160
        },
        {
            name: 'Ryzen 7 2700X',
            price: 220
        }
    ];
    res.render('pages/index', {
        products: products
    });
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));