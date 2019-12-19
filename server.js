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
    res.redirect('/home');
})

app.get('/home', function (req, res) {
    res.render('pages/index');
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));