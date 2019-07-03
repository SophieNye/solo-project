const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Book = new Schema({
    bookArray: Array
})

module.exports = mongoose.model('book', Book);