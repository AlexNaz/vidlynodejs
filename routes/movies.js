const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post('/', async(req,res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if(!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie ({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
   numberInStock: req.body.numberInStock,
   dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

// router.put('/:id', async(req,res) => {
//   const { error } = validate(req.body);
//   if(error) return res.status(400).send(error.details[0].message);

//   const movie = await Movie.findByIdAndUpdate(req.params.id,
//    {
//      title: req.body.title,
//      numberInStock: req.body.numberInStock,
//      genre: {
//       _id: genre._id,
//       name: genre.name
//     },
//      dailyRentalRate: req.body.dailyRentalRate
//    }, {
//     new: true
//   });

//   if(!movie) return res.status(400).send('Invalid movie.');

//   movie = await movie.save();
//   res.send(movie);
// });

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  res.send(movie);
  } catch (err) {
      res.status(404).send('The movie with the given ID was not found.');
  }
});
module.exports = router;
