let mongoose = require('mongoose'),
    Residencial = mongoose.model('Residencial'),
    Comercial = mongoose.model('Comercial'),
    api = {};

/*-------------------- Residencial API --------------------*/

api.collectionCountResidencial = async (search) => {
    let collectionSize = 0;

    await Residencial
        .count(
            {
                $or: [
                    {'anuncio': new RegExp(search, 'gi')},
                    {'cidade': new RegExp(search, 'gi')},
                    {'bairro': new RegExp(search, 'gi')}
                ]
            })
        .then(count => {

            collectionSize = count;
        }, err => {

            console.log('Error at API:Residencial METHOD:collectionCountResidencial. ERROR: ' + err);
        });

    return collectionSize;
};

api.filterCollectionCountResidencial = async (filter) => {
    let collectionSize = 0;

    await Residencial
        .find({
            $or: [
                {casa: filter.casa},
                {apartamento: filter.apartamento},
                {terreno: filter.terreno}
            ],
            dormitorios: parseInt(filter.dormitorios),
            banheiros: parseInt(filter.banheiros),
            valor: {$gte: parseFloat(filter.valorMinimo), $lte: parseFloat(filter.valorMaximo)}
        })
        .count()
        .then(count => {

            collectionSize = count;
        }, err => {

            console.log('Error at API:Residencial METHOD:filterCollectionCountResidencial. ERROR: ' + err);
        });

    return collectionSize;
};

api.listPageResidencial = async (req, res) => {

    let page = Math.trunc(req.query.page),
        search = req.query.search ? req.query.search : '.*',
        skip = null,
        limit = 8,
        data = {};
    if (page < 0) page = 1;
    skip = (page - 1) * limit;

    /*
    * Dados da pagina requisitada
    * */
    await Residencial
        .find({
            $or: [
                {anuncio: new RegExp(search, 'gi')},
                {cidade: new RegExp(search, 'gi')},
                {bairro: new RegExp(search, 'gi')}
            ]
        })
        .limit(limit)
        .sort({$natural: -1})
        .skip(skip)
        .then(async imoveis => {

            data.content = imoveis;
            data.collectionSize = await api.collectionCountResidencial(search);
        }, err => {

            console.log('Error at API:Residencial METHOD:listPageResidencial. ERROR: ' + err);
            res.status(500).json(err);
        });

    res.status(200).json(data);
};

api.filterListPageResidencial = async (req, res) => {

    let page = Math.trunc(req.query.page),
        skip = null,
        limit = 8,
        data = {},
        filter = {},
        tipoImovel = req.query.tipo.toLowerCase(),
        casa = false,
        apartamento = false,
        terreno = false,
        dormitorios = Math.trunc(req.query.dormitorios)? Math.trunc(req.query.dormitorios) : 1,
        banheiros = Math.trunc(req.query.banheiros)? Math.trunc(req.query.banheiros) : 1,
        valorMinimo = req.query.minimo? req.query.minimo : 1000,
        valorMaximo = req.query.maximo? req.query.maximo : 2000000;


    if (page < 0) page = 1;
    skip = (page - 1) * limit;

    if (tipoImovel === 'casa') {
        casa = true;
    } else if (tipoImovel === 'apartamento') {
        apartamento = true;
    } else if (tipoImovel === 'terreno') {
        terreno = true;
    }

    filter.casa = casa;
    filter.apartamento = apartamento;
    filter.terreno = terreno;
    filter.dormitorios = dormitorios;
    filter.banheiros = banheiros;
    filter.valorMinimo = valorMinimo;
    filter.valorMaximo = valorMaximo;

    await Residencial
        .find({
            $or: [
                {casa: casa},
                {apartamento: apartamento},
                {terreno: terreno}
            ],
            dormitorios: parseInt(dormitorios),
            banheiros: parseInt(banheiros),
            valor: {$gte: parseFloat(valorMinimo), $lte: parseFloat(valorMaximo)}
        })
        .limit(limit)
        .sort({$natural: -1})
        .skip(skip)
        .exec(async (err, imoveis) => {

            if (err) {

                console.log('Error at API:Residencial METHOD:filterListPageResidencial. ERROR: ' + err);
                res.status(500).json(err);
            } else {

                data.content = imoveis;
                data.collectionSize = await api.filterCollectionCountResidencial(filter);
                res.status(200).json(data);
            }
        });
};

/*------------------- Comercial API ---------------------*/

api.listPageComercial = (req, res) => {

    res.end();
};

module.exports = api;
