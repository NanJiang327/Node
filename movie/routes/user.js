const express = require('express');
const router = express.Router();
const User = require('../models/user')

// POST  /user/singup
router.post('/signup', function(req, res) {
    const _user = req.body.user;
    const user = new User(_user);

    user.save(function(err, user) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    })
    // req.parm
})
