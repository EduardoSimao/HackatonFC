const jtw = require('jsonwebtoken');
const config = require('../../configs/config');

const auth = (req, res, next) =>{
    const token = req.headers.auth;

    if(!token) return res.status(401).send({error: 'Você precisa fazer a autenticação!'});

    jtw.verify(token, config.secret_key, (err, decoded) =>{
        if(err) return res.status(401).send({error: 'Token Invalida!'});
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;