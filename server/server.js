require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
// const OAuth = require('@zalando/oauth2-client-js');
const goodreads = require('goodreads-api-node');

const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};



app.use(express.static(path.join(__dirname, '../public/index.html')));

const hello = [{ hello: 'world' }]
console.log(hello)
const gr = goodreads(myCredentials)
const callbackURL = 'http://localhost:3000/goodreads'

// app.get('/myshelf', (req, res, next) => {
//     gr.getUsersShelves('98770925')
//         .then(console.log);
// })

app.get('/auth/goodreads', async (req, res, next) => {
    console.log('test')
    gr.initOAuth(callbackURL)
    await gr.getRequestToken()
        .then(url => { res.redirect(url) })
})

app.get('/goodreads', async (req, res, next) => {
    console.log('req.body ', req.body)
    console.log('req.params ', req.params)
    const oauthtoken = req.params.oauth_token;
    console.log('oauthtoken ', oauthtoken);
    const authorize = req.params.authorize
    console.log('authorize ', authorize);
    await gr.getAccessToken()
        .then(() => {
            gr.getBooksOnUserShelf('98770925', 'read')
                .then((result) => res.send(result.books.book[0]))
            // .then(res.redirect(path.join('./goodreads.html')))
        });
})



app.listen(3000);

// const goodreads = new OAuth.Provider({
//     id: 'goodreads',   // required
//     authorization_url: 'https://www.goodreads.com/api/auth_user' // required
// });

    // const request = new OAuth.Request({
    //     client_id: process.env.GOODREADS_KEY,  // required
    //     redirect_uri: 'http://localhost:3000/auth-answer'
    // });

    // // Give it to the provider
    // const uri = godreads.requestToken(request);

    // // Later we need to check if the response was expected
    // // so save the request
    // goodreads.remember(request);

    // // Do the redirect
    // window.location.href = uri;