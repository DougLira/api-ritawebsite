let mongoose = require('mongoose'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    Residencial = mongoose.model('Residencial'),
    Comercial = mongoose.model('Comercial'),
    api = {};

/* ---------------- Upload IMAGES --------------------- */

api.uploadImages = (req, res) => {

    let HOST = '';

    if (process.env.NODE_ENV === 'development') {
        HOST = 'http://localhost:3000';
    } else {
        HOST = 'http://174.138.57.46:3000';
    }

    const tmp_path = path.join(__dirname, '../..', 'tmp');
    const uploads_path = path.join(__dirname, '../..', 'uploads');
    var path_urls = [];
    var form = new formidable.IncomingForm();
    form.multiples = false;
    form.hash = 'md5';
    form.uploadDir = tmp_path;
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            res.json(err);
            return
        };

        Object.keys(files).forEach(file_name => {
            // var hash = Math.random().trunc();
            var oldpath = files[file_name].path;
            var newpath = `${uploads_path}/${file_name}`;
            path_urls.push(`${HOST}/${file_name}`)
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) {
                    console.log('fs error --> ', err);
                    res.json(err);
                    return
                }
            })
        })
    });

    form.on('end', function () {
        res.json(path_urls);
    })
}

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
        churrasqueira: req.body.churrasqueira || false,
        piscina: req.body.piscina || false,
        area_util: req.body.area_util,
        area_construida: req.body.area_construida,
        descricao: req.body.descricao,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        endereco: req.body.endereco,
        condominio: req.body.condominio || false,
        lancamento: req.body.lancamento || false,
        finalidade: req.body.finalidade,
        tipo: req.body.tipo,
        foto: req.body.foto,
        fotos: req.body.fotos.map(foto => foto)
    });

    Residencial
        .create(imovel)
        .then(data => {

            //ID do objeto cadastrado
            res.status(201).json(data._id);
        }, err => {

            console.log('Error at API:Admin METHOD:createResidencial. ERROR: ' + err);
            res.status(400).json(err);
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
                lancamento: req.body.lancamento,
                finalidade: req.body.finalidade,
                tipo: req.body.tipo
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:updateResidencial. ERROR: ' + err);
            res.status(400).json(err);
        });
};

api.deleteResidencial = (req, res) => {

    Residencial
        .remove({
            _id: req.params.id
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:deleteResidencial. ERROR: ' + err);
            res.status(400).json(err);
        })
};

api.updateImagesResidencial = (req, res) => {

    const imagens = req.body;

    if (imagens.foto.length > 0) {

        Residencial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    foto: imagens.foto[0],
                    fotos: imagens.fotos
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesResidencial. ERROR: ' + err);
                res.status(400).json(err);
            });
    } else {

        Residencial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    fotos: imagens.fotos
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesResidencial. ERROR: ' + err);
                res.status(400).json(err);
            });
    }
};

api.addImagesResidencial = (req, res) => {

    const imagens = req.body;

    Residencial
        .findByIdAndUpdate(req.params.id, {
            $push: {
                fotos: {
                    $each: imagens
                }
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:addImagesResidencial. ERROR: ' + err);
            res.status(400).json(err);
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
        tipo: req.body.tipo,
        lancamento: req.body.lancamento,
        finalidade: req.body.finalidade,
        foto: req.body.foto,
        fotos: req.body.fotos.map(foto => foto)
    });

    Comercial
        .create(imovel)
        .then(data => {

            //ID do objeto cadastrado
            res.status(201).json(data._id);
        }, err => {

            console.log('Error at API:Admin METHOD:createComercial. ERROR: ' + err);
            res.status(400).json(err);
        });
};

api.updateComercial = (req, res) => {

    console.log('Request', req.body)

    const imovel = {
        anuncio: req.body.anuncio,
        valor: req.body.valor,
        area_util: req.body.area_util,
        descricao: req.body.descricao,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        endereco: req.body.endereco,
        tipo: req.body.tipo,
        lancamento: req.body.lancamento,
        finalidade: req.body.finalidade
    }

    Comercial
        .findByIdAndUpdate(req.params.id, {
            $set: {
                anuncio: imovel.anuncio,
                valor: imovel.valor,
                area_util: imovel.area_util,
                descricao: imovel.descricao,
                cidade: imovel.cidade,
                bairro: imovel.bairro,
                endereco: imovel.endereco,
                tipo: imovel.tipo,
                lancamento: imovel.lancamento,
                finalidade: imovel.finalidade
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:updateComercial. ERROR: ' + err);
            res.status(400).json(err);
        });
};

api.deleteComercial = (req, res) => {

    Comercial
        .remove({
            _id: req.params.id
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:deleteComercial. ERROR: ' + err);
            res.status(400).json(err);
        })
};

api.updateImagesComercial = (req, res) => {

    const imagens = req.body;

    if (imagens.foto.length > 0) {

        Comercial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    foto: imagens.foto[0],
                    fotos: imagens.fotos
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesComercial. ERROR: ' + err);
                res.status(400).json(err);
            });
    } else {

        Comercial
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    fotos: imagens.fotos
                }
            })
            .then(data => {

                res.sendStatus(204);
            }, err => {

                console.log('Error at API:Admin METHOD:updateImagesComercial. ERROR: ' + err);
                res.status(400).json(err);
            });
    }
};

api.addImagesComercial = (req, res) => {

    const imagens = req.body;

    Comercial
        .findByIdAndUpdate(req.params.id, {
            $push: {
                fotos: {
                    $each: imagens
                }
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at API:Admin METHOD:addImagesComercial. ERROR: ' + err);
            res.status(400).json(err);
        })
};

module.exports = api;