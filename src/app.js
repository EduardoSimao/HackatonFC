const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const index = require('./routes/index');
const userRoute = require('./routes/userRoute');
const eventoRoute = require('./routes/eventoRouter');
const participanteRoute = require('./routes/participanteRouter');

const mongoose = require('mongoose');
const config = require('../configs/config');

const url = config.url_db;

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
}

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Não foi possivel realizar a conexão com o banco de dados' + err);
});

mongoose.connection.on('disconnected', () =>{
    console.log('A aplicação foi desconectada do banco de dados!');
});

mongoose.connection.on('connected', () =>{
    console.log('Aplicação conectada com o banco de dados!');
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/user', userRoute);
app.use('/evento', eventoRoute);
app.use('/participante', participanteRoute);

app.listen(3000);
module.exports = app;

