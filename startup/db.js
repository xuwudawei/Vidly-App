const mongoose = require('mongoose');
const winston = require('winston');
const config = require("config");

module.exports = function () {
    mongoose.connect(config.get('db'),{ useNewUrlParser: true, uri_decode_auth: true })
        .then(() => console.log(`Connected to ${db} successfully ...`));
}