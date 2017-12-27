module.exports = function(app) {

    let api = app.api.auth;

    app.post('/authenticate', api.authenticate);

    app.use('/admin/*', api.verifyToken);
};