
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const path = require('path');
// const OAuth = require('@zalando/oauth2-client-js');
const goodreads = require('goodreads-api-node');
const cors = require('cors')
const Book = require('.././BookModel')
const db = mongoose.connect('mongodb://sophie:Hg9BL5JSfNzVRag@ds147207.mlab.com:47207/heroku_1zsz2rfj', (err, client) => {
    if (err) console.log('err in mongoose connect', err)
    else if (client) console.log('connected to database')
});

const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};

app.use(cors())

app.options('*', cors())

app.use(express.static(path.join(__dirname, '../public/index.html')));

const hello = [{ hello: 'world' }]
console.log(hello)
const gr = goodreads(myCredentials)
const callbackURL = 'http://localhost:8080/goodreads'

let proxy = 'https://cors-anywhere.herokuapp.com/'

app.get('/auth/goodreads', async (req, res, next) => {
    console.log('test')
    gr.initOAuth(callbackURL)
    await gr.getRequestToken()
        .then(url => { res.redirect(url) })
        .catch((err) => console.log('/auth/goodreads catch err ', err))
})

app.get('/goodreads', async (req, res, next) => {
    console.log('at goodreads')
    await gr.getAccessToken()
        .then(() => {
            gr.getBooksOnUserShelf('98770925', 'read', { per_page: 200 })
                .then((result) => {
                    // console.log('result.books.book ', result.books.book[0])
                    mongoose.connection.db.dropCollection('books', (err, result) => {
                        if (err) console.log('drop collection err ', err)
                    })
                    const book = new Book({ bookArray: result.books.book })
                    book.save(function (err) {
                        if (err) res.send('err in saving book to DB ', err, i);
                    })
                    res.set('content-type: text/html; charset=UTF-8').status(200).redirect('/bookshelf');
                })
        })
        .catch((err) => console.log('err in goodreads catch ', err))
});

app.get('/getmybooks', (req, res, next) => {
    console.log('get my books ')
    Book.findOne({}, function (err, result) {
        if (err) console.log('err getting books ', err)
        // console.log(result)
        res.set('Content-Type', 'application/json')
        res.status(200).send(result)
    })
})



app.listen(3000);

