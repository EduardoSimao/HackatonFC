const Users = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../configs/config');
const auth = require('../controllers/auth');
const request = require("request");
const jtw = require('jsonwebtoken');


const createUserToken = (userEmail) =>{
    return jwt.sign({email: userEmail}, config.secret_key, {expiresIn: config.token_time});
}

exports.getUser = (async (req, res) => {
    try{
        const token = req.headers.auth;

        if(!token) return res.status(401).send({error: 'Você precisa fazer a autenticação!'});

        jtw.verify(token, config.secret_key, (err, decoded) =>{
            if(err) return res.status(401).send({error: 'Token Invalida!'});
            res.locals.auth_data = decoded;
            console.log( res.locals.auth_data)
         })

        const user = await Users.findOne({email: res.locals.auth_data.email});
        return res.send(user);

    }catch (err){
        return res.status(500).send({error: 'Usuário não encontrado!'});
    }
    
});

exports.createUser = (async (req, res) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password) return res.status(400).send({error: 'Dados incompletos!'});

    try{
        if(await Users.findOne({email})) return res.status(400).send({error: 'Usuário já existente!'});

        const user = await Users.create(req.body);
        user.password = undefined;

        var data = {form: {
            token: 'xoxp-666280868949-666278966880-654897869922-8cfb7d2ab6afc85411784651729a0790',
            channel: "#entretenimento",
            text: "Hi! :wave: \n Welcome @" + user.name
          }};
            request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
            // Sends welcome message
            res.json();
          });

        return res.status(201).send({user, token: createUserToken(user.email)});

    }catch (err){
        return res.status(500).send({error: 'Erro ao realizar a buscar usuário!'});
    }
});
exports.postAuth = (async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({error: 'Dados incompletos!'});

    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.status(400).send({error: 'Usuário não encontrado!'})

        const passOK = await bcrypt.compare(password, user.password);
        if(!passOK) return res.status(401).send({error: 'Senha incorretas!'});

        user.password = undefined;
        return res.send({token: createUserToken(user.email)});

    }catch (err){
        return res.status(500).send({error: 'Erro ao realizar a buscar usuário!'});
    }
});
