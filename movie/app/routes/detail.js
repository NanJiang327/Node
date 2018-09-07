const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const Comment = require('../models/comment');


router.get('/:id', function(req, res) {
    const id = req.params.id;
    Movie.findById(id, function(err, movie) {
        Comment.find({movie: id})
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function(err, comments) {
                if (comments) {
                    console.log('==='+comments[1].reply);
                }

                res.render('detail', {
                    title: 'Movie Detail',
                    movie: movie,
                    comments: comments,
                })
            })
    })
});

module.exports = router;
