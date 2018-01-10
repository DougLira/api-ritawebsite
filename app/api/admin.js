let urlDefault = require('../models/default-picture'),
    mongoose = require('mongoose'),
    Residencial = mongoose.model('Residencial'),
    Comercial = mongoose.model('Comercial'),
    api = {};

/*---------------- Residencial API ----------------------*/

api.createResidencial = (req, res) => {

    let imovel = new Residencial({
        anuncio: req.body.anuncio,
        valor: req.body.valor,
        dormitorios: req.body.dormitorios,
        sala_estar: req.body.sala_estar,
        sala_jantar: req.body.sala_jantar,
        suites: req.body.suites,
        vagas: req.body.vagas,
        banheiros: req.body.banheiros,
        churrasqueira: req.body.churrasqueira? req.body.churrasqueira : false,
        piscina: req.body.piscina? req.body.piscina : false,
        area_util: req.body.area_util,
        area_construida: req.body.area_construida,
        descricao: req.body.descricao,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        endereco: req.body.endereco,
        condominio: req.body.condominio,
        finalidade: req.body.finalidade,
        tipo: req.body.tipo
    });

    Residencial
        .create(imovel)
        .then(data => {

            //ID do objeto cadastrado
            res.status(201).json(data._id);
        }, err => {

            console.log('Error at API:Admin METHOD:createResidencial. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.updateResidencial = (req, res) => {

    Residencial
        .findByIdAndUpdate(req.params.id, {
            $set: {
                anuncio: req.body.anuncio,
                valor: req.body.valor,
                dormitorios: req.body.dormitorios,
                sala_estar: req.body.sala_estar,
                sala_jantar: req.body.sala_jantar,
                suites: req.body.suites,
                vagas: req.body.vagas,
                banheiros: req.body.banheiros,
                churrasqueira: req.body.churrasqueira,
                piscina: req.body.piscina,
                area_util: req.body.area_util,
                area_construida: req.body.area_construida,
                descricao: req.body.descricao,
                cidade: req.body.cidade,
                bairro: req.body.bairro,
                endereco: req.body.endereco,
                condominio: req.body.condominio,
                finalidade: req.body.finalidade,
                tipo: req.body.tipo
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:updateResidencial. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.deleteResidencial = (req, res) => {

    Residencial
        .remove({_id: req.params.id})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:deleteResidencial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

api.createImagesResidencial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8')),
        fotosSecundarias = [];

    if (!imagens.fotoPrincipal) imagens.fotoPrincipal = urlDefault;

    for (let url of imagens.fotosSecundarias) {

        let foto = {
            url: url
        };

        fotosSecundarias.push(foto);
    }

    Residencial
        .findByIdAndUpdate(req.params.id, {
            $set: {
                fotoPrincipal: {url: imagens.fotoPrincipal},
                fotos: fotosSecundarias
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:createImagesResidencial. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.updateImagesResidencial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8'));

    if (imagens.fotoPrincipal) {

        Residencial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    fotoPrincipal: {url: imagens.fotoPrincipal},
                    fotos: imagens.fotosSecundarias
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesResidencial. ERROR: ' + err);
                res.status(500).json(err);
            });
    } else {

        Residencial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    fotos: imagens.fotosSecundarias
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesResidencial. ERROR: ' + err);
                res.status(500).json(err);
            });
    }
};

api.addImagesResidencial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8'));

    Residencial
        .findByIdAndUpdate(req.params.id, {$push: {fotos: {$each: imagens}}})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:addImagesResidencial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

/*---------------------- Comercial API --------------------------*/

api.createComercial = (req, res) => {

    let imovel = new Comercial({
        anuncio: req.body.anuncio,
        valor: req.body.valor,
        area_util: req.body.area_util,
        descricao: req.body.descricao,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        endereco: req.body.endereco,
        tipo: req.body.tipo
    });

    Comercial
        .create(imovel)
        .then(data => {

            //ID do objeto cadastrado
            res.status(201).json(data._id);
        }, err => {

            console.log('Error at API:Admin METHOD:createComercial. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.updateComercial = (req, res) => {

    Comercial
        .findByIdAndUpdate(id, {
            $set: {
                anuncio: req.body.anuncio,
                valor: req.body.valor,
                area_util: req.body.area_util,
                descricao: req.body.descricao,
                cidade: req.body.cidade,
                bairro: req.body.bairro,
                endereco: req.body.endereco,
                tipo: req.body.tipo
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:updateComercial. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.deleteComercial = (req, res) => {

    Comercial
        .remove({_id: req.params.id})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:deleteComercial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

api.createImagesComercial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8')),
        fotosSecundarias = [];

    if (!imagens.fotoPrincipal) imagens.fotoPrincipal = urlDefault;

    for (let url of imagens.fotosSecundarias) {

        let foto = {
            url: url
        };

        fotosSecundarias.push(foto);
    }

    Comercial
        .findByIdAndUpdate(req.params.id, {
            $set: {
                fotoPrincipal: {url: imagens.fotoPrincipal},
                fotos: fotosSecundarias
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:createImagesComercial. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.updateImagesComercial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8'));

    if (imagens.fotoPrincipal) {

        Comercial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    fotoPrincipal: {url: imagens.fotoPrincipal},
                    fotos: imagens.fotosSecundarias
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesComercial. ERROR: ' + err);
                res.status(500).json(err);
            });
    } else {

        Comercial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    fotos: imagens.fotosSecundarias
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesComercial. ERROR: ' + err);
                res.status(500).json(err);
            });
    }
};

api.addImagesComercial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8'));

    Comercial
        .findByIdAndUpdate(req.params.id, {$push: {fotos: {$each: imagens}}})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:addImagesComercial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

module.exports = api;