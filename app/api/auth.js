module.exports = app => {

    let mongoose = require('mongoose'),
        jwt = require('jsonwebtoken'),
        User = mongoose.model('User'),
        api = {};

    api.authenticate = (req, res) => {

        console.log('Tentativa de autenticação...');
        User
            .findOne(req.body)
            .then(user => {

                if (!user) {

                    console.log('Login ou senha inválidos.');
                    res.sendStatus(401);
                    return;
                }

                console.log('Autenticado com sucesso');
                let token = jwt.sign({
                    login: user.login
                }, app.get('secret'), {
                    expiresIn: '5h'
                });

                res.set('x-access-token', token);
                res.sendStatus(204);
            }, err => {

                console.log('User Authenticates ERROR: ' + err);
                res.sendStatus(401);
            })
    };

    api.verifyToken = (req, res, next) => {

        console.log('Dentro do verifyToken');
        let token = req.headers['x-access-token'];

        if (token) {

            console.log('Verificando token...');

            jwt.verify(token, app.get('secret'), (err, decoded) => {

                if (err) {

                    console.log('Token rejeitado.');
                    res.sendStatus(401);
                    return;
                }

                User
                    .findOne({
                        login: decoded.login
                    })
                    .then(user => {

                        if (user) {

                            console.log('Usuario existente');
                            next();
                        } else {

                            res.sendStatus(401);
                        }
                    });
            });
        } else {

            console.log('Token não presente.');
            res.sendStatus(400);
        }
    };

    return api;
};