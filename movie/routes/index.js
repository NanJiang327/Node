module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/main');
    });

    app.use('/admin', require('./admin'));
    app.use('/admin/list', require('./list'));
    app.use('/movie', require('./detail'));
    app.use('/main', require('./main'));

    app.use(function(req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
}
