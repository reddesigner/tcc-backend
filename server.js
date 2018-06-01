
/**
/*  aplicação Portfolio de Projetos
/*  TCC PUC Minas - pós graduação em desenvolvimento web, 2016-2018
/*  autor/aluno: Alexandre O Dias
**/

// chamada dos pacotes
var express = require('express');
var app = express();

var mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

var config = require('./config');

var mailer = require('./extra/mailer');
// mailer.send(); // envia email!

var cron = require('./extra/cron');
//cron.initTest();

// banco de dados
mongoose.connect(config.database, function(err){
    if (err) {
        console.log('Erro de conexão com banco de dados');
        console.dir(err);
        // TODO erro conexão com o banco
        return;
    }
});

// cors
var cors = require('cors');
app.use(cors());

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

/*
// TODO TEMP teste apenas
router.use(function(req,res,next){
    res.setHeader('aux', 'planta marron bom-bom');
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
    // decodifica o token
    if (token && token != '') {
        console.log('token', token);
    }
    res.setHeader('X-Powered-By', 'Galo!');
    next();
});
*/
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
    //console.log('All requests...');
    res.sendFile(__dirname + '/public/index.html');
});

// qualquer outra rota tem retorno: http 404
app.use(function(req, res){
    console.log('404');
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

app.listen(3000);

console.log('app rodando e ouvindo na porta 3000');
