const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');


router.get('/:id', function(req, res) {
    const id = req.params.id;
    console.log(Date.now());
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: movie.title,
            movie: movie,
        })
    })
});

module.exports = router;
