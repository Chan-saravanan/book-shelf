const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    review:{
        type:String,
        default:'N/A!'
    },
    pages:{
        type:String,
        default:'N/A!'
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    price:{
        type:String,
        default:'N/A!'
    },
    ownerId:{
        type:String,
        required:true
    }
}, {timestamps:true});


const Book = mongoose.model('book', BookSchema);

module.exports = {Book}

