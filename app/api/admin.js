let urlDefault = require('../models/default-picture'),
    mongoose = require('mongoose'),
    Residencial = mongoose.model('Residencial'),
    Comercial = mongoose.model('Comercial'),
    api = {};

/*---------------- Residencial API ----------------------*/

api.createResidencial = (req, res) => {

    let casa = false,
        apartamento = false,
        terreno = false;

    if (req.body.tipo === 'casa') {
        casa = true;
    } else if (req.body.tipo === 'apartamento') {
        apartamento = true;
    } else if (req.body.tipo === 'terreno') {
        terreno = true;
    }

    let imovel = new Residencial({
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
        locacao: req.body.locacao,
        casa: casa,
        apartamento: apartamento,
        terreno: terreno
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

    let id = req.params.id,
        casa = false,
        apartamento = false,
        terreno = false;

    if (req.body.tipo.toLowerCase() === 'casa') {
        casa = true;
    } else if (req.body.tipo.toLowerCase() === 'apartamento') {
        apartamento = true;
    } else if (req.body.tipo.toLowerCase() === 'terreno') {
        terreno = true;
    }

    Residencial
        .findByIdAndUpdate(id, {
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
                locacao: req.body.locacao,
                casa: casa,
                apartamento: apartamento,
                terreno: terreno
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

    let id = req.params.id;

    Residencial
        .remove({_id: id})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:deleteResidencial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

api.createImagesResidencial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8')),
        id = req.params.id,
        fotosSecundarias = [];

    if (!imagens.fotoPrincipal) imagens.fotoPrincipal = urlDefault;

    for (let url of imagens.fotosSecundarias) {

        let foto = {
            url: url
        };

        fotosSecundarias.push(foto);
    }

    Residencial
        .findByIdAndUpdate(id, {
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

    const imagens = JSON.parse(req.body.toString('utf8')),
        id = req.params.id;

    if (imagens.fotoPrincipal) {

        Residencial
            .findByIdAndUpdate(id, {
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
            .findByIdAndUpdate(id, {
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

    const imagens = JSON.parse(req.body.toString('utf8')),
        id = req.params.id;

    Residencial
        .findByIdAndUpdate(id, {$push: {fotos: {$each: imagens}}})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:addImagesResidencial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

/*---------------------- Comercial API --------------------------*/

api.createComercial = (req, res) => {

    let varejo = false,
        sala_comercial = false,
        andar_corrido = false,
        galpao = false,
        terreno = false;

    if (req.body.tipo === 'varejo') {
        varejo = true;
    } else if (req.body.tipo === 'sala_comercial') {
        sala_comercial = true;
    } else if (req.body.tipo === 'andar_corrido') {
        andar_corrido = true;
    } else if (req.body.tipo === 'galpao') {
        galpao = true;
    }
    else if (req.body.tipo === 'terreno') {
        terreno = true;
    }

    let imovel = new Comercial({
        anuncio: req.body.anuncio,
        valor: req.body.valor,
        area_util: req.body.area_util,
        descricao: req.body.descricao,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        endereco: req.body.endereco,
        varejo: varejo,
        sala_comercial: sala_comercial,
        andar_corrido: andar_corrido,
        galpao: galpao,
        terreno: terreno
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

    let id = req.params.id,
        varejo = false,
        sala_comercial = false,
        andar_corrido = false,
        galpao = false,
        terreno = false;

    if (req.body.tipo === 'varejo') {
        varejo = true;
    } else if (req.body.tipo === 'sala_comercial') {
        sala_comercial = true;
    } else if (req.body.tipo === 'andar_corrido') {
        andar_corrido = true;
    } else if (req.body.tipo === 'galpao') {
        galpao = true;
    } else if (req.body.tipo === 'terreno') {
        terreno = true;
    }

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
                varejo: varejo,
                sala_comercial: sala_comercial,
                andar_corrido: andar_corrido,
                galpao: galpao,
                terreno: terreno
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

    let id = req.params.id;

    Comercial
        .remove({_id: id})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:deleteComercial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

api.createImagesComercial = (req, res) => {

    const imagens = JSON.parse(req.body.toString('utf8')),
        id = req.params.id,
        fotosSecundarias = [];

    if (!imagens.fotoPrincipal) imagens.fotoPrincipal = urlDefault;

    for (let url of imagens.fotosSecundarias) {

        let foto = {
            url: url
        };

        fotosSecundarias.push(foto);
    }

    Comercial
        .findByIdAndUpdate(id, {
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

    const imagens = JSON.parse(req.body.toString('utf8')),
        id = req.params.id;

    if (imagens.fotoPrincipal) {

        Comercial
            .findByIdAndUpdate(id, {
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
            .findByIdAndUpdate(id, {
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

    const imagens = JSON.parse(req.body.toString('utf8')),
        id = req.params.id;

    Comercial
        .findByIdAndUpdate(id, {$push: {fotos: {$each: imagens}}})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:addImagesComercial. ERROR: ' + err);
            res.status(500).json(err);
        })
};

module.exports = api;