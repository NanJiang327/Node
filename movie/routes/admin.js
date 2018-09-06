const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const User = require('../models/users');
const _ = require('underscore');

// GET /admin/movie
router.get('/movie', function(req, res) {
    res.render('admin', {
        title: 'admin',
        movie: {
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: '',
        }});
});

// GET /admin/update/:id
router.get('/update/:id', function(req, res) {
    const id = req.params.id;

    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'Admin Update',
                movie: movie,
            })
        })
    }
})

// GET /admin/userList
router.get('/userlist', function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: 'User list',
            users: users,
        })
    })
})

// POST /admin/movie/new
router.post('/movie/new', function(req, res) {
    const id = req.body.movie._id;
    const movieObj = req.body.movie;
    let _movie;

    console.log(id.length);

    if (id.length) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    consoel.log(err);
                }

                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary,
        })


        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/' + movie._id);
        })
    }
})

module.exports = router;
