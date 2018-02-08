module.exports = function(app) {

    let api = app.api.auth;

    app.post('/api/authenticate', api.authenticate);

    app.use('/api/admin/*', api.verifyToken);
};