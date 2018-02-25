module.exports = app => {

    let api = app.api.site;

    app.route('/api/imoveis/residencial')
        .get(api.listPageResidencial);

    app.route('/api/imoveis/residencial/filter')
        .get(api.filterListPageResidencial);

    app.route('/api/imoveis/comercial')
        .get(api.listPageComercial);

    app.route('/api/imoveis/comercial/filter')
        .get(api.filterListPageComercial);

    app.route('/api/imoveis/lancamentos')
        .get(api.listPageLancamentos);

    app.route('/api/imoveis/lancamentos/filter')
        .get(api.filterListPageLancamentos);

    app.route('/api/duvida')
        .post(api.sendMail)
};