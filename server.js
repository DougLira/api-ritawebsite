const app = require('./config/express');

require('./config/database')('localhost/ritaimoveis');

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));