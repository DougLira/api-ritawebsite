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
                ],
                lancamento: false
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
            finalidade: filter.finalidade,
            tipo: filter.tipo,
            valor: {$gte: parseFloat(filter.valorMinimo), $lte: parseFloat(filter.valorMaximo)},
            lancamento: false
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
            ],
            lancamento: false
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
        tipo = req.query.tipo.toLowerCase(),
        finalidade = req.query.finalidade.toLowerCase(),
        valorMinimo = req.query.minimo ? req.query.minimo : 1000,
        valorMaximo = req.query.maximo ? req.query.maximo : 2000000;

    if (page < 0) page = 1;
    skip = (page - 1) * limit;

    filter.tipo = tipo;
    filter.finalidade = finalidade;
    filter.valorMinimo = valorMinimo;
    filter.valorMaximo = valorMaximo;

    await Residencial
        .find({
            finalidade: finalidade,
            valor: {
                $gte: parseFloat(valorMinimo),
                $lte: parseFloat(valorMaximo)
            },
            tipo: tipo,
            lancamento: false
        })
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

api.collectionCountComercial = async (search) => {
    let collectionSize = 0;

    await Comercial
        .count(
            {
                $or: [
                    {'anuncio': new RegExp(search, 'gi')},
                    {'cidade': new RegExp(search, 'gi')},
                    {'bairro': new RegExp(search, 'gi')}
                ],
                lancamento: false
            })
        .then(count => {

            collectionSize = count;
        }, err => {

            console.log('Error at API:Comercial METHOD:collectionCountComercial. ERROR: ' + err);
        });

    return collectionSize;
};

api.filterCollectionCountComercial = async (filter) => {
    let collectionSize = 0;

    await Comercial
        .find({
            tipo: filter.tipo,
            valor: {$gte: parseFloat(filter.valorMinimo), $lte: parseFloat(filter.valorMaximo)},
            lancamento: false
        })
        .count()
        .then(count => {

            collectionSize = count;
        }, err => {

            console.log('Error at API:Comercial METHOD:filterCollectionCountComercial. ERROR: ' + err);
        });

    return collectionSize;
};

api.listPageComercial = async (req, res) => {

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
    await Comercial
        .find({
            $or: [
                {anuncio: new RegExp(search, 'gi')},
                {cidade: new RegExp(search, 'gi')},
                {bairro: new RegExp(search, 'gi')}
            ],
            lancamento: false
        })
        .limit(limit)
        .sort({$natural: -1})
        .skip(skip)
        .then(async imoveis => {

            data.content = imoveis;
            data.collectionSize = await api.collectionCountComercial(search);
        }, err => {

            console.log('Error at API:Comercial METHOD:listPageComercial. ERROR: ' + err);
            res.status(500).json(err);
        });

    res.status(200).json(data);
};

api.filterListPageComercial = async (req, res) => {

    let page = Math.trunc(req.query.page),
        skip = null,
        limit = 8,
        data = {},
        filter = {},
        tipo = req.query.tipo.toLowerCase(),
        valorMinimo = req.query.minimo ? req.query.minimo : 1000,
        valorMaximo = req.query.maximo ? req.query.maximo : 2000000;


    if (page < 0) page = 1;
    skip = (page - 1) * limit;

    filter.tipo = tipo;
    filter.terreno = terreno;
    filter.valorMinimo = valorMinimo;
    filter.valorMaximo = valorMaximo;

    await
        Comercial
            .find({
                tipo: tipo,
                valor: {$gte: parseFloat(valorMinimo), $lte: parseFloat(valorMaximo)},
                lancamento: false
            })
            .limit(limit)
            .sort({$natural: -1})
            .skip(skip)
            .exec(async (err, imoveis) => {

                if (err) {

                    console.log('Error at API:Comercial METHOD:filterListPageComercial. ERROR: ' + err);
                    res.status(500).json(err);
                } else {

                    data.content = imoveis;
                    data.collectionSize = await api.filterCollectionCountComercial(filter);
                    res.status(200).json(data);
                }
            });
};


/*------------------- Lançamentos API ---------------------*/

api.collectionCountLancamentos = async () => {
    let collectionSize = 0;

    await Residencial
        .count(
            {
                lancamento: true
            })
        .then(count => {

            collectionSize = count;
        }, err => {

            console.log('Error at API:Lancamentos METHOD:collectionCountLancamentos. ERROR: ' + err);
        });

    await Comercial
        .count(
            {
                lancamento: true
            })
        .then(count => {

            collectionSize += count;
        }, err => {

            console.log('Error at API:Lancamentos METHOD:collectionCountLancamentos. ERROR: ' + err);
        });

    return collectionSize;
};

api.filterCollectionCountLancamentos = async (filter) => {
    let collectionSize = 0;

    if (filter.residencial === true) {

        await Residencial
            .find({
                lancamento: true
            })
            .count()
            .then(count => {

                collectionSize = count;
            }, err => {

                console.log('Error at API:Lancamentos METHOD:filterCollectionCountLancamentos. ERROR: ' + err);
            });
    } else if (filter.comercial === true) {

        await Comercial
            .count(
                {
                    lancamento: true
                })
            .then(count => {

                collectionSize += count;
            }, err => {

                console.log('Error at API:Lancamentos METHOD:collectionCountLancamentos. ERROR: ' + err);
            });
    }

    return collectionSize;
};

api.listPageLancamentos = async (req, res) => {

    let page = Math.trunc(req.query.page),
        imoveisDataBase = new Array(),
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
            lancamento: true
        })
        .limit(limit / 2)
        .sort({$natural: -1})
        .skip(skip)
        .then(async imoveis => {

            imoveisDataBase.push(imoveis);
        }, err => {

            console.log('Error at API:Lancamentos METHOD:listPageLancamentos. ERROR: ' + err);
            res.status(500).json(err);
        });

    await Comercial
        .find({
            lancamento: true
        })
        .limit(limit / 2)
        .sort({$natural: -1})
        .skip(skip)
        .then(async imoveis => {

            imoveisDataBase.push(imoveis);
        }, err => {

            console.log('Error at API:Lancamentos METHOD:listPageLancamentos. ERROR: ' + err);
            res.status(500).json(err);
        });

    data.content = imoveisDataBase;
    data.collectionSize = await api.collectionCountLancamentos();

    res.status(200).json(data);
};

api.filterListPageLancamentos = async (req, res) => {

    let page = Math.trunc(req.query.page),
        skip = null,
        limit = 8,
        data = {};

    if (page < 0) page = 1;
    skip = (page - 1) * limit;

    if (req.body.residencial === true) {

        await
            Residencial
                .find({
                    lancamento: true
                })
                .limit(limit)
                .sort({$natural: -1})
                .skip(skip)
                .exec(async (err, imoveis) => {

                    if (err) {

                        console.log('Error at API:Lancamentos METHOD:filterListPageLancamentos. ERROR: ' + err);
                        res.status(500).json(err);
                    } else {

                        data.content = imoveis;
                        data.collectionSize = await api.filterCollectionLancamentos(req.body);
                        res.status(200).json(data);
                    }
                });

    } else if (req.body.comercial === true) {

        await
            Comercial
                .find({
                    lancamento: true
                })
                .limit(limit)
                .sort({$natural: -1})
                .skip(skip)
                .exec(async (err, imoveis) => {

                    if (err) {

                        console.log('Error at API:Lancamentos METHOD:filterListPageLancamentos. ERROR: ' + err);
                        res.status(500).json(err);
                    } else {

                        data.content = imoveis;
                        data.collectionSize = await api.filterCollectionLancamentos(req.body);
                        res.status(200).json(data);
                    }
                });
    }
};

module.exports = api;
