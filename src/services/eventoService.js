const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    tipo: { type: String, required: true},  
    author:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    desc: { type: String, required: true},
    createAt: {type: Date, default: Date.now},
    situacao: {type: Boolean, default: true}
});


module.exports = mongoose.model('Evento', eventoSchema);