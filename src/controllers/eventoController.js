const Eventos = require('../services/eventoService');
const request = require("request");
const jtw = require('jsonwebtoken');
const config = require('../../configs/config');
const Users = require('../services/userService');


exports.getAllEventos = ( async (req, res) =>{
    try{
        const eventos = await Eventos.find();
        return res.send({eventos});

    }catch (err){
        return res.status(500).send({error: 'Eventos não encontrados!'});
    }
})

exports.createEvento = (async (req, res) =>{
    const {tipo, desc} = req.body;

    if(!tipo || !desc) return res.status(400).send({error: 'Dados incompletos!'});

    try{
        const token = req.headers.auth;

        if(!token) return res.status(401).send({error: 'Você precisa fazer a autenticação!'});

        jtw.verify(token, config.secret_key, (err, decoded) =>{
            if(err) return res.status(401).send({error: 'Token Invalida!'});
            res.locals.auth_data = decoded;
         })

        const user = await Users.findOne({email: res.locals.auth_data.email});
        const evento = await Eventos.create({ ...req.body, author: user._id});

        var data = {form: {
            token: '',
            channel: "#entretenimento",
            text: "Hi! :wave: \n Novo Evento de " + evento.tipo + " Cadastrado! \n  Descrição: " + evento.desc
          }};
            request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
            // Sends welcome message
            res.json();
          });

        return res.status(201).send({evento});

    }catch (err){
        return res.status(500).send({error: 'Erro ao realizar o cadastro do evento!' + err});
    }
});