To start application:

In the root folder, run the following commands:


To install dependencies
1. npm install

To start node express server
2. npm start

To ensure the app is up, access the following route. And check that the route returns a json object with status UP
localhost:8080

=====================================================================================================

BONUS:                                         
                                            
It will be considered a differential, developers who can execute their own unit tests. To run the tests, in the root folder run:

To run unit tests.
1. npm test

PS: The tests cases are inside the tests folder


### Endpoints: ###
* Usuarios
```bash
GET - Retornar os dados do usuário autenticado
/user
```
```bash
POST - Cadastrar um usuário
/user/create

{
    "email": "email@email.com", 
    "password": "1234"
}
```
```bash
POST - Autenticar usuário
/user/auth

{
    "email": "email@email.com", 
    "password": "1234"
}
```
* Eventos
```bash
GET - Retornar os dados do eventos cadastrados
/evento
```
```bash
POST - Cadastrar um Evento
/evento/create

{
	"tipo": "Teste",
	"desc": "Teste",
	"DataInicial" : "2019-06-15T14:00:00.000Z",
	"DataFinal" : "2019-06-15T18:00:00.000Z"
}
```
 ```bash
PUT - Finalizar um Evento
/evento/Id
```
* Participantes
```bash
GET - Retornar os dados dos usuarios cadastrados em todos os eventos
/participante
```
```bash
POST - Se cadastrar em um Evento
/participante/create

{
	"eventoID": "5d05238b02ba8a0dc0fd22e6"
}
```