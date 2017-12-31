module.exports = function (app) {

    let api = app.api.site;

    app.route('/imoveis/residencial')
        .get(api.listPageResidencial);

    app.route('/imoveis/residencial/filter')
        .get(api.filterListPageResidencial);

    app.route('/imoveis/comercial')
        .get(api.listPageComercial);
};