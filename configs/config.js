const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            url_db: 'mongodb+srv://admin:admin123@clusternodejs-ipi3l.mongodb.net/test?retryWrites=true',
            secret_key: 'superSecreto',
            token_time: '7d',
            slack_token: ''
        }
    }
}

console.log(`Inciando aplicação no ambiente ${env.toLocaleUpperCase()}`);

module.exports = config();