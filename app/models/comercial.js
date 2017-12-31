let urlDefault = require('./default-picture'),
    mongoose = require('mongoose'),
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
        fotoPrincipal:{
            url: {
                type: String,
                default: urlDefault
            }
        },
        fotos: [],
        area_util: {
            type: Number,
            required: true,
            default: 0
        },
        area_construida: {
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
        varejo: {
            type: Boolean,
            required: true,
            default: false
        },
        sala: {
            type: Boolean,
            required: true,
            default: false
        },
        andar_corrido: {
            type: Boolean,
            required: true,
            default: false
        },
        galpao: {
            type: Boolean,
            required: true,
            default: false
        },
        terreno: {
            type: Boolean,
            required: true,
            default: false
        },
        descricao: {
            type: String
        }
    });

mongoose.model('Comercial', schema);