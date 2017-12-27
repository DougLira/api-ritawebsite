module.exports = app => {

    let apiAdmin = app.api.admin,
        apiSite = app.api.site;

    app.route('/admin/imoveis')
        .get(apiSite.listPage)
        .post(apiAdmin.novoImovel);

    app.route('/admin/imoveis/:id')
        .delete(apiAdmin.deleteImovel);

    app.route('/admin/imoveis/update/images/:id')
        .put(apiAdmin.updateImages);

};