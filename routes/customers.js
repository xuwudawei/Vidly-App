const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get('/', async (req, res) => { 
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
        }
    );
    let result = await customer.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).send('The given id for customer is invalid.'); 
        }
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                isGold: req.body.isGold
            }
        }, { new: true });
           if (!customer) return res.status(404).send('The customer with the given ID was not found.');
        res.send(customer);
    } catch (error) {
         res.send(error.message);
        
    }
});

router.delete('/:id', async (req, res) => {
     const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
     res.send(`The customer with ID: ${req.params.id} has been deleted successfully.`);
 });

module.exports=router;