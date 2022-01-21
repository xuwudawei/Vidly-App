const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();
const { Movie, validate } = require('../models/movie');

router.get('/', async (req, res) => {
   const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req, res) => {

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});

router.post('/', async (req, res) => { 
      const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');  
    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
        
    });

    await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).send('The given id for movie is invalid.'); 
}
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
            }
        }, { new: true });
           if (!movie) return res.status(404).send('The movie with the given ID was not found.');
        res.send(movie);
    } catch (error) {
        res.send(error.message);
        
    }
    //  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    // res.send(genre);
});

router.delete('/:id', async (req, res) => {
     const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
     res.send(movie);
 });



module.exports = router;