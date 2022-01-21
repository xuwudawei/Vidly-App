const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold:{type:Boolean,default:false}
}));


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;