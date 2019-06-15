const Eventos = require('../services/eventoService');
const request = require("request");
const jtw = require('jsonwebtoken');
const config = require('../../configs/config');
const Users = require('../services/userService');
const Participantes = require('../services/participanteService');


exports.getAllPArticipantes = ( async (req, res) =>{
    try{
        const participantes = await Participantes.find();
        return res.send({participantes});

    }catch (err){
        return res.status(500).send({error: 'Participantes não encontrados!'});
    }
})

exports.createEventoParticipante = (async (req, res) =>{
    const {eventoID} = req.body;

    if(!eventoID) return res.status(400).send({error: 'Dados incompletos!'});

    try{
        const token = req.headers.auth;

        if(!token) return res.status(401).send({error: 'Você precisa fazer a autenticação!'});

        jtw.verify(token, config.secret_key, (err, decoded) =>{
            if(err) return res.status(401).send({error: 'Token Invalida!'});
            res.locals.auth_data = decoded;
         })

        const evento = await Eventos.findOne({ _id: eventoID});
        if(!evento) return res.status(401).send({error: 'Evento não encontrado!'});


        const user = await Users.findOne({email: res.locals.auth_data.email});
        const participante = await Participantes.create({ ...req.body, participante: user._id, evento: evento})

        var data = {form: {
            token: config.slack_token,
            channel: "#entretenimento",
            text: "Hi, @ "+ user.name + "! :wave: \n Você se cadastrou para " + evento.tipo
          }};
            request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
            // Sends welcome message
            res.json();
          });

        return res.status(201).send({participante});

    }catch (err){
        return res.status(500).send({error: 'Erro ao realizar o cadastro no evento!' + err});
    }
});