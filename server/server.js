const express = require('express');
const app = express();
const path = require('path');
// const OAuth = require('@zalando/oauth2-client-js');
const goodreads = require('goodreads-api-node');

const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};

const callbackURL = './goodreads'

const gr = goodreads(myCredentials, callbackURL);

app.use(express.static(path.join(__dirname, '../public/index.html')));

const hello = [{ hello: 'world' }]
console.log(hello)

app.get('/auth/goodreads', (req, res, next) => {
    console.log('test')
    gr.getRequestToken()
        .then(url => {/* redirect your user to this url to ask for permission */ })

    gr.getAccessToken()
        .then(() => { /* you can now make authenticated requests */ });
    // res.send(hello)
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