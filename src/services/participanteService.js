const mongoose = require('mongoose');

const participanteSchema = new mongoose.Schema({  
    participante:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    evento:{ type: mongoose.Schema.Types.ObjectId, ref: 'Evento', require: true },
    createAt: {type: Date, default: Date.now},
    situacao: {type: Boolean, default: true}
});


module.exports = mongoose.model('Participante', participanteSchema);