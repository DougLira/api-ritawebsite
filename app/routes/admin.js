module.exports = app => {

    let apiAdmin = app.api.admin,
        apiSite = app.api.site;

    /*-------------- Residencial ROUTES --------------*/

    app.route('/admin/imoveis/residencial')
        .get(apiSite.listPageResidencial)
        .post(apiAdmin.createResidencial);

    app.route('/admin/imoveis/residencial/:id')
        .delete(apiAdmin.deleteResidencial)
        .put(apiAdmin.updateResidencial);

    app.route('/admin/imoveis/residencial/images/:id')
        .post(apiAdmin.createImagesResidencial)
        .put(apiAdmin.updateImagesResidencial);

    app.route('/admin/imoveis/residencial/images/add/:id')
        .put(apiAdmin.addImagesResidencial);

    /*-------------- Comercial ROUTES --------------*/

    app.route('/admin/imoveis/comercial')
        .get(apiSite.listPageComercial)
        .post(apiAdmin.createComercial);

    app.route('/admin/imoveis/comercial/:id')
        .delete(apiAdmin.deleteComercial)
        .put(apiAdmin.updateComercial);

    app.route('/admin/imoveis/comercial/images/:id')
        .post(apiAdmin.createImagesComercial)
        .put(apiAdmin.updateImagesComercial);

    app.route('/admin/imoveis/comercial/images/add/:id')
        .put(apiAdmin.addImagesComercial);
};