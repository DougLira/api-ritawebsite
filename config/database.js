module.exports = function (uri) {

    const mongoose = require('mongoose');

    mongoose.connect(`mongodb://${uri}`, {useMongoClient: true});

    mongoose.connection.on('connected', function () {
        console.log('Conectado ao MongoDB');
    });

    mongoose.connection.on('error', function (err) {
        console.log('Erro na conexão: ' + err);
    });

    mongoose.connection.on('disconnected', function (err) {
        console.log('Desconectado do MongoDB');
    });

    /*
    * SIGINT: Processo disparado pelo Node quando a aplicação é finalizada.
    * */
    process.on('SIGINT', function () {

        mongoose.connection.close(function () {

            console.log('Conexão fechada pelo término da aplicação.');
            process.exit(0);
        })
    });
};