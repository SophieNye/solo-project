const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport-goodreads').Strategy;


app.use(express.static(path.join(__dirname, '../public/index.html')));

const hello = [{ hello: 'world' }]
console.log(hello)

app.get('/goodreads', (req, res, next) => {
    console.log('test')
    res.send(hello)
})



app.listen(3000); 