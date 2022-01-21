const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');




router.get('/', async (req, res,next) => {
   
       const genres = await Genre.find().sort('name');
    res.send(genres);
  
});

router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.post('/',auth, async (req, res) => { 

      const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({
        name: req.body.name
    });

    let result = await genre.save();
    res.send(result);
});

router.put('/:id', async (req, res) => { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).send('The given id for genre is invalid.'); 
}
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
      $set:{  name: req.body.name}
        }, { new: true });
           if (!genre) return res.status(404).send('The genre with the given ID was not found.');
        res.send(genre);
    } catch (error) {
        res.send(error.message);
        
    }
    //  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    // res.send(genre);
});

router.delete('/:id',[auth,admin], async (req, res) => {
     const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
     res.send(genre);
 });



module.exports = router;