const express = require('express');
const router = express.Router();
const User = require('../models/users')
const sha1 = require('sha1');

// POST  /user/singup
router.post('/signup', function(req, res) {
    const _user = req.body.user;
    _user.password = sha1(_user.password);

    User.findOne({name: _user.name}, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (user) {
            return res.redirect('/');
        } else {
            const user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            })
        }
    })
    // req.parm
})

// POST /user/singin
router.post('/signin', function(req, res) {
    const _user = req.body.user;
    const name = _user.name;
    const password = sha1(_user.password);

    User.findOne({name: name}, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (!user) {
            console.log('User is not exist');
            return res.redirect('/');
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user;
                return res.redirect('/');
            } else {
                console.log('Password is not matched');
                return res.redirect('/');
            }
        })
    })
})

module.exports = router;
