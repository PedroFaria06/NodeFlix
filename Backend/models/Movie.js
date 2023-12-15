const mongoose = require('mongoose')

const Movie = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        sinopse: {
            type: String,
            required: true
        },
        dataLancamento: {
            type: Date,
            required: true
        },
        User: {
            //alteração para salvar somente o id do usuario 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },


    })

module.exports = mongoose.model('Movie', Movie);