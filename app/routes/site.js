module.exports = function (app) {

    let api = app.api.site;

    app.route('/imoveis/residencial')
        .get(api.listPageResidencial);

    app.route('/imoveis/residencial/filter')
        .get(api.filterListPageResidencial);

    app.route('/imoveis/comercial')
        .get(api.listPageComercial);

    app.route('/imoveis/comercial/filter')
        .get(api.filterListPageComercial);

    app.route('/imoveis/lancamentos')
        .get(api.listPageLancamentos);

    app.route('/imoveis/lancamentos/filter')
        .get(api.filterListPageLancamentos);
};