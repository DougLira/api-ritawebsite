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
        dormitorios: {
            type: Number,
            required: true,
            default: 1
        },
        sala_estar:{
            type: Number,
            required:true,
            default: 1
        },
        sala_jantar:{
            type: Number,
            required:true,
            default: 0
        },
        suites: {
            type: Number,
            required: true,
            default: 0
        },
        vagas: {
            type: Number,
            required: true,
            default: 0
        },
        banheiros: {
            type: Number,
            required: true,
            default: 1
        },
        churrasqueira: {
            type: Boolean,
            required: true,
            default: 0
        },
        piscina: {
            type: Boolean,
            required: true,
            default: 0
        },
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
        casa: {
            type: Boolean,
            required: true,
            default: false
        },
        apartamento: {
            type: Boolean,
            required: true,
            default: false
        },
        terreno: {
            type: Boolean,
            required: true,
            default: false
        },
        condominio: {
            type: Boolean,
            required: true,
            default: false
        },
        locacao: {
            type: Boolean,
            required: true,
            default: false
        },
        descricao: {
            type: String
        }
    });

mongoose.model('Residencial', schema);