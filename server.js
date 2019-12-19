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
    let products = [{
        name: 'Logitech Gpro wireless',
        price: 50,
        image: 'logitechgprowireless.png',
        description: 'Epic mouse'
    }, {
        name: 'asus rx580',
        price: 200,
        image: 'asusrx580_8gb.jpg',
        description: 'Good graphics card'
    }]
    res.render('pages/index', {
        products: products
    });
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));