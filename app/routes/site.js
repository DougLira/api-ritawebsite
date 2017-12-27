module.exports = function (app) {

    let api = app.api.site;

    app.route('/imoveis')
        .get(api.listPage);

    app.route('/imoveis/filter')
        .get(api.filterListPage);
};