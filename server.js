const app = require('./config/express');

// require('./config/database')('douglas:douglas18@naboo.mongodb.umbler.com:39740/ritaimoveis');
require('./config/database')('localhost/ritaimoveis');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Servidor rodando na porta ' + port));