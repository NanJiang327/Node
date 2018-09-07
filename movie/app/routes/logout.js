const express = require('express');
const router = express.Router();

// GET /logout
router.get('/', function(req, res) {
    delete req.session.user;

    res.redirect('/main');
})


module.exports = router;
