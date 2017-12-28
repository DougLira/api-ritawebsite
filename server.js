const app = require('./config/express');

require('./config/database')('localhost/ritaimoveis');

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Servidor rodando na porta' + port));