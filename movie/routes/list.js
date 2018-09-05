const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');

// GET admin/list
router.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'List',
            movies: movies,
        });
    })
});

// DELETE admin/list
router.delete('/', function(req, res) {
    const id = req.query.id;
    console.log('Server delete called')
    console.log(req.query);
    if (id) {
        Movie.deleteOne({_id: id}, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        })
    }
})

module.exports = router;
