
/**
/*  aplicação Portfolio de Projetos
/*  TCC PUC Minas - pós graduação em desenvolvimento web, 2016-2018
/*  autor/aluno: Alexandre O Dias
**/

// chamada dos pacotes
var express = require('express');
var app = express();

//var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

var config = require('./config');

var mailer = require('./extra/mailer');
// mailer.send(); // envia email!

var cron = require('./extra/cron');
//cron.initTest();

// banco de dados
var mongoose = require('mongoose');
//
var db = mongoose.connection;
db.on('connecting', function() {
  console.log('|-----------------------> connecting to MongoDB...');
});
db.on('error', function(error) {
  console.error('|-----------------------> Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function() {
  console.log('|-----------------------> MongoDB connected!');
});
db.once('open', function() {
  console.log('|-----------------------> MongoDB connection opened!');
});
db.on('reconnected', function () {
  console.log('|-----------------------> MongoDB reconnected!');
});
db.on('disconnected', function() {
  console.log('|-----------------------> MongoDB disconnected!');
  // mongoose.connect(config.database, {server:{auto_reconnect:true}}); // Atenção: mongoose.connect em 2 lugares diferentes!
});
//
mongoose.connect(config.database, function(err){
    if (err) {
        console.log('\n\nSERVER.JS, linha 50\n - Erro de conexão com banco de dados');
        return;
    }
});

// cors
var cors = require('cors');
app.use(cors({
    exposedHeaders: ['authorization', 'content-type', 'observe', 'x-access-token', 'X-Powered-By', 'x-permissions']
}));

// configrar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// roteadores
var setupRoute = require('./setup');
var autenticarRoute = require('./routes/autenticar');
var autorizarMiddleWareRoute = require('./routes/autorizar');

// roteadores +
var projectRoute = require('./routes/projetos');
var userRoute = require('./routes/usuarios');
var indicatorRoute = require('./routes/indicadores');
var permissionRoute = require('./routes/permissoes');

var projectIndicatorRoute = require('./routes/projetos-indicadores');
var projectIndicatorPhaseRoute = require('./routes/projetos-indicadores-fases');
var projectTeamRoute = require('./routes/projetos-equipes');
var projectStatusRoute = require('./routes/projetos-status');

var reportRoute = require('./routes/relatorios');

// ========================================================= //

var router = express.Router(); // cria uma instancia do roteador do express

// TODO isto aqui é apenas temporário >> rota de SETUP
router.use('/setup', setupRoute);

// middleware de autenticação/autorização para ser usado em todas chamadas/rotas
router.use(autorizarMiddleWareRoute);

// TODO TEMP teste apenas ----------- manter a checagem de erro de conexão ao banco em algum lugar...
/*router.use(function(req,res,next) {
    // checa conexão ao banco
    if (mongoose.connection.readyState) {
        //x-permissions
        var permissionModel = require('./models/permissoes');
        permissionModel.find({
            route: req.url
        }).lean().exec(function(err, perms) {
            let sendperm = 'Gerente';
            for (let t=0; t<perms.length; t++) {
                for (let i=0; i<perms[t].role.length; i++) {
                    if (sendperm.length)
                        sendperm = sendperm + ', ' + perms[t].role[i];
                    else
                        sendperm = perms[t].role[i];
                }
            }
            res.setHeader('x-permissions', sendperm);
            //res.setHeader('x-permissions', JSON.stringify(perms));
            next();
        });
        //next();
    } else {
        // tenta montar nova conexão para próximos requests
        mongoose.connect(config.database);
        // enquanto isso retorna erro de imediato, frontend deve fazer um retry!
        res.status(500);
        res.send({ message: 'Problemas na conexão com banco de dados da aplicação', type: 'error', action: 'retry' });
        return;
    }
});*/

// rotas > delegar demais rotas para respectivos roteadores
router.use('/autenticar', autenticarRoute);
router.use('/projeto', projectRoute);
router.use('/projeto-indicador-fase', projectIndicatorPhaseRoute);
router.use('/projeto-indicador', projectIndicatorRoute);
router.use('/projeto-equipe', projectTeamRoute);
router.use('/projeto-status', projectStatusRoute);
router.use('/usuario', userRoute);
router.use('/indicador', indicatorRoute);
router.use('/permissao', permissionRoute);
router.use('/relatorio', reportRoute);

// todas rotas do backend vão usar o prefixo /api
app.use('/api', router);

// o frontend usará o prefixo /frontend
app.use('/frontend', express.static(__dirname + '/public'));
app.use('/frontend', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

// qualquer outra rota tem retorno: http 404
app.use(function(req, res){
    console.log('\n\nSERVER.JS 150. \n 404');
    // responde com html
    if (req.accepts('html')) { // melhor usar req.format ?
        res.status(404);
        res.send('<h1>404</h1><p>Recurso não encontrado: <b>' + req.url + '</b></p>');
        return;
    }
    // responde com json
    if (req.accepts('json')) {
        res.status(404);
        res.send({ message: 'Recurso não encontrado', type: 'error' });
        return;
    }
    // default no caso de plain-text. send()
    res.status(404);
    res.type('txt').send('Recurso não encontrado');
});

// ========================================================= //

app.listen(4200);

console.log('\n\napp rodando e ouvindo na porta 4200\n\n');
