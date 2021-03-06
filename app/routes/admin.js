module.exports = app => {

    let apiAdmin = app.api.admin,
        apiSite = app.api.site;

    /* ------------- Upload ROUTE ----------------- */

    app.route('/api/upload')
        .post(apiAdmin.uploadImages);

    /*-------------- Residencial ROUTES --------------*/

    app.route('/api/admin/imoveis/residencial')
        .get(apiSite.listPageResidencial)
        .post(apiAdmin.createResidencial);

    app.route('/api/admin/imoveis/residencial/:id')
        .delete(apiAdmin.deleteResidencial)
        .put(apiAdmin.updateResidencial);

    app.route('/api/admin/imoveis/residencial/images/:id')
        .put(apiAdmin.updateImagesResidencial);

    app.route('/api/admin/imoveis/residencial/images/add/:id')
        .put(apiAdmin.addImagesResidencial);

    /*-------------- Comercial ROUTES --------------*/

    app.route('/api/admin/imoveis/comercial')
        .get(apiSite.listPageComercial)
        .post(apiAdmin.createComercial);

    app.route('/api/admin/imoveis/comercial/:id')
        .delete(apiAdmin.deleteComercial)
        .put(apiAdmin.updateComercial);

    app.route('/api/admin/imoveis/comercial/images/:id')
        .put(apiAdmin.updateImagesComercial);

    app.route('/api/admin/imoveis/comercial/images/add/:id')
        .put(apiAdmin.addImagesComercial);

};