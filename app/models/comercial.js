let mongoose = require('mongoose'),
    schema = mongoose.Schema({

        anuncio: {
            type: String,
            required: true,
            default: 'N/A'
        },
        valor: {
            type: Number,
            required: true,
            default: 0.00
        },
        foto: {
            type:String,
            default: 'http://localhost:3000/foto-indisponivel.jpg'
        },
        fotos: [],
        area_util: {
            type: Number,
            required: true,
            default: 0
        },
        cidade: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        endereco: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        finalidade: {
            type: String,
            required: true
        },
        descricao: {
            type: String
        },
        lancamento: {
            type: Boolean,
            default: false
        }
    });

mongoose.model('Comercial', schema);