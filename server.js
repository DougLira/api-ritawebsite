const app = require('./config/express');

if (process.env.NODE_ENV === 'development') {

    require('./config/database')('localhost/ritaimoveis');
} else {

    require('./config/database')('douglas:douglas18@naboo.mongodb.umbler.com:39740/ritaimoveis');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Servidor rodando na porta ' + port));