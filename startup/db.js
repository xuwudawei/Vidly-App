const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log('Connected to MongoDB...'));
}