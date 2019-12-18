const express = require('express')
const formidable = require('express-formidable');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express()
const port = 3000
// app.use(express.static('public'));
// app.use(express.urlencoded());
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: path.join('./public/images/'),
    multiples: true,
    keepExtensions: true
}));



app.listen(port, () => console.log(`Webshop open on port ${port}!`));