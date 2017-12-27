let mongoose = require('mongoose'),
    Imoveis = mongoose.model('Imoveis'),
    api = {};

api.collectionCount = async (search) => {
    let collectionSize = 0;

    await Imoveis
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

            console.log('Error at MODEL:Imoveis METHOD:count. ERROR: ' + err);
        });

    return collectionSize;
};

api.filterCollectionCount = async (filter) => {
    let collectionSize = 0;

    await Imoveis
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

            console.log('Error at MODEL:Imoveis METHOD:count. ERROR: ' + err);
        });

    return collectionSize;
};

api.listPage = async (req, res) => {

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
    await Imoveis
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
            data.collectionSize = await api.collectionCount(search);
        }, err => {

            console.log('Error at MODEL:Imoveis METHOD:listPage. ERROR: ' + err);
            res.status(500).json(err);
        });

    res.status(200).json(data);
};

api.filterListPage = async (req, res) => {

    let page = Math.trunc(req.query.page),
        skip = null,
        limit = 8,
        data = {},
        filter = {},
        tipoImovel = req.query.tipo,
        casa = false,
        apartamento = false,
        terreno = false,
        dormitorios = Math.trunc(req.query.dormitorios)? Math.trunc(req.query.dormitorios) : 1,
        banheiros = Math.trunc(req.query.banheiros)? Math.trunc(req.query.banheiros) : 1,
        valorMinimo = req.query.minimo? req.query.minimo : 1000,
        valorMaximo = req.query.maximo? req.query.maximo : 2000000;


    if (page < 0) page = 1;
    skip = (page - 1) * limit;

    if (tipoImovel == 'Casa') {
        casa = true;
    } else if (tipoImovel == 'Apartamento') {
        apartamento = true;
    } else if (tipoImovel == 'Terreno') {
        terreno = true;
    }

    filter.casa = casa;
    filter.apartamento = apartamento;
    filter.terreno = terreno;
    filter.dormitorios = dormitorios;
    filter.banheiros = banheiros;
    filter.valorMinimo = valorMinimo;
    filter.valorMaximo = valorMaximo;

    await Imoveis
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

                console.log('Error at MODEL:Imoveis METHOD:filterListPage. ERROR: ' + err);
                res.status(500).json(err);
            } else {

                data.content = imoveis;
                data.collectionSize = await api.filterCollectionCount(filter);
                res.status(200).json(data);
            }
        });
};

module.exports = api;
