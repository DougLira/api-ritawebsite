const app = require('./config/express');

if (process.env.NODE_ENV === 'development'){

    require('./config/database')('localhost:27017/ritaimoveis');
} else{

    require('./config/database')('mongodb:27017/ritaimoveis');
}

const port = 3000;
app.listen(port, () => console.log('Servidor rodando na porta ' + port));


