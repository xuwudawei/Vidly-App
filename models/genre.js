const Joi = require('joi');
const mongoose = require('mongoose');
const genraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre',genraSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

exports.genraSchema=genraSchema;
exports.Genre = Genre;
exports.validate = validateGenre;