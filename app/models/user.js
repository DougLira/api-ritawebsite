let mongoose = require('mongoose'),
    schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

mongoose.model('User', schema);