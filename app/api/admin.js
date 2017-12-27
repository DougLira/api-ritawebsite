let urlDefault = require('../models/default-picture'),
    mongoose = require('mongoose'),
    Imoveis = mongoose.model('Imoveis'),
    api = {};

api.novoImovel = (req, res) => {

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

    let imovel = new Imoveis({
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
        casa: casa,
        apartamento: apartamento,
        terreno: terreno
    });

    Imoveis
        .create(imovel)
        .then(data => {

            //ID do objeto cadastrado
            res.status(201).json(data._id);
        }, err => {

            console.log('Error at MODEL:Admin METHOD:novoImovel. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.updateImages = (req, res) => {

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

    Imoveis
        .findByIdAndUpdate(id, {
            $set: {
                fotoPrincipal: {url: imagens.fotoPrincipal},
                fotos: fotosSecundarias
            }
        })
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at MODEL:Admin METHOD:updateImages. ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.deleteImovel = (req, res) => {

    let id = req.params.id;

    Imoveis
        .remove({_id: id})
        .then(data => {

            res.sendStatus(204);
        }, err => {

            console.log('Error at MODEL:Admin METHOD:novoImovel. ERROR: ' + err);
            res.status(500).json(err);
        })
};


module.exports = api;