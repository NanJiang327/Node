const express = require('express');
const router = express.Router();
const Movie = require('../models/movies')

// GET /main
router.get('/', function(req, res) {
    console.log('user in session:');
    console.log(req.session.user);


    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'Main',
            movies: movies,
        });
    })
});

module.exports = router;
