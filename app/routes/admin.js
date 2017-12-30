module.exports = app => {

    let apiAdmin = app.api.admin,
        apiSite = app.api.site;

    app.route('/admin/imoveis')
        .get(apiSite.listPage)
        .post(apiAdmin.createImovel);

    app.route('/admin/imoveis/:id')
        .delete(apiAdmin.deleteImovel)
        .put(apiAdmin.updateImovel);

    app.route('/admin/imoveis/images/:id')
        .post(apiAdmin.createImages)
        .put(apiAdmin.updateImages);

    app.route('/admin/imoveis/images/add/:id')
        .put(apiAdmin.addImages);
};