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

app.get('/', function (req, res) {
    res.json({
        message: 'The server works!'
    })
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));