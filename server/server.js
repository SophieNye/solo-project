
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const path = require('path');
// const OAuth = require('@zalando/oauth2-client-js');
const goodreads = require('goodreads-api-node');
const cors = require('cors')
const Book = require('.././BookModel')
mongoose.connect('mongodb://sophie:Hg9BL5JSfNzVRag@ds147207.mlab.com:47207/heroku_1zsz2rfj');
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
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


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
let proxy = 'https://cors-anywhere.herokuapp.com/'

app.get('/auth/goodreads', async (req, res, next) => {
    console.log('test')
    gr.initOAuth(callbackURL)
    await gr.getRequestToken()
        .then(url => { res.redirect(url) })
        // .then((result) => {
        //     console.log('result ', result)
        //     let bookArr = JSON.parse(result)
        //     console.log('bookArr ', bookArr)
        //     for (let i = 0; i < bookArr.length; i++) {
        //         const book = new Book({ info: bookArr[i] })
        //         book.save(function (err) {
        //             if (err) res.send('err in saving book to DB ', err, i);
        //         })
        //     }
        //     res.set('content-type: text/html; charset=UTF-8').status(200).sendFile(path.join(__dirname, './public/bookshelf.html'));
        // })
        .catch((err) => console.log('/auth/goodreads catch err ', err))
})

app.get('/goodreads', async (req, res, next) => {
    console.log('at goodreads')
    await gr.getAccessToken()
        .then(() => {
            gr.getBooksOnUserShelf('98770925', 'read', { per_page: 200 })
                .then((result) => {
                    console.log('result.books.book ', result.books.book[0])
                    mongoose.connection.db.dropCollection('books', (err, result) => {
                        if (err) console.log('drop collection err ', err)
                    })
                    const book = new Book({ bookArray: result.books.book })
                    book.save(function (err) {
                        if (err) res.send('err in saving book to DB ', err, i);
                    })
                    res.set('content-type: text/html; charset=UTF-8').status(200).sendFile(path.join(__dirname, '.././public/bookshelf.html'));
                })
        })
        .catch((err) => console.log('err in goodreads catch ', err))
    // .then(res.redirect(path.join('./goodreads.html')))
});



app.listen(3000);

