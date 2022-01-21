const Joi = require('joi');
const mongoose = require('mongoose');
const genraSchema = require("./genre");


const Movie = mongoose.model('Movie',  new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 50,trim:true },
    genre: {
        type: genraSchema,
        required:true
    },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.objectId().required() ,
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;