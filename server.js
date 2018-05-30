
/**
/*  aplicação Portfolio de Projetos
/*  TCC PUC Minas - pós graduação em desenvolvimento web, 2016-2018
/*  autor/aluno: Alexandre O Dias
**/


/*
var cors = require('cors')

var app = express()
app.use(cors())

cors({credentials: true, origin: true})

// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// ou
app.all('/*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
*/

// chamada dos pacotes
var express = require('express');
var app = express();

var mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

var config = require('./config');

var mailer = require('./extra/mailer');
// mailer.send(); // envia email!

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
// cors({credentials: true, origin: true});

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

// teste GET http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'Servidor funcionando. API na rota /api', type: 'success' });
});

// TODO isto aqui é apenas temporário >> rota de SETUP
router.use('/setup', setupRoute);

// middleware de autenticação/autorização para ser usado em todas chamadas/rotas
// router.use(autorizarMiddleWareRoute);

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

// todas rotas vão usar o prefixo /api
app.use('/api', router);

// qualquer outra rota tem retorno: http 404
/*
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
*/

// qualquer outra rota vai para pasta public e arquivo index.html
app.use('/public', express.static(__dirname + '/public'));

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// ========================================================= //

app.listen(3000);

console.log('app rodando e ouvindo na porta 3000');

/*

big TODO
--------

BACKEND

criar aplicação                             == ok
instalar dependencias                       == ok

criar arquivo principal                     == ok
importar express                            == ok
adicionar listener na porta do servidor     == ok

criar rotas de mapeamento das url           == ok
criar rota para arquivos estáticos
criar rota default                          == não, não há rota default... é 404 na veia!
criar rota de 404                           == ok

criar arquivos de roteadores                == ok
fazer mapeamento de sub-rotas
- cruds                                     == ok
- relacionamentos                           == ok

importar body-parser                        == ok
importar method override (delete e put)     == não foi necessário...

importar mongoose                           == ok
conectar com banco de dados                 == ok

criar modelos de dados para as entidades
- projetos                                  == ok
- usuários                                  == ok
- indicadores                               == ok
- projetos x usuarios                       == ok
- projetos x indicadores                    == ok
- projetos x indicadores x fases            == ok
- permissão de telas por perfis             == ok

- alterar status do projeto (com justificativa) todos perfins podem atuar aqui

procedimentos agendados
- risco alto deve ter acompanhamento semanal
- 3+ indicadores no vermelho envia email p/ direção

envio de email



perfil:
administrador do sistema - admin
alta direção - director
líder de escritorio de projetos - team principal
líder de projetos - team leader
gerente de projetos - manager

permissões x perfil:
crud projetos - lider de escritorio de projetos - /projeto
crud indicadores - lider de escritorio de projetos - /indicador
crud usuarios - administrador sistema - /usuario
status projetos - todo mundo - /projeto-status (put)
equipe projetos - lider de projetos - /projeto-equipe
indicador projeto - lider de escritorio de projetos - /projeto-indicador
indicador fases projeto - gerente de projeto - /projeto-fase-indicador
permissões de telas - administrador sistema - /permissao
relatorio - alta direção - /relatorio



FRONTEND

prototipos
criar projeto
implementar prototipo
rotas
carregar listas
- lista projeto
- lista usuarios
- lista indicadores



ESCRITA

intro
desenho (atores, casos de uso)
casos de uso
casos de teste
teste usabilidade
arquitetura de software
ahhhh!!!



Setup inicial da aplicação
- um usuário com role máximo (admin)
- views/roles cadastrados na tabela de permissões



- passos para finalizar
21/05 - habilitar CORS, deixar servidor rodando na amazon com ultima versão
22 - frontend angular deve chamar a listagem do servidor                                                !!!!!! no... não fiz isso!      == ok atrasado
23 - frontend deve ter todas suas rotas prontas. Backend deve estar com todas rotas implementadas       !!!!!! no...
24 - frontend deve fazer um crud completo!                                                              == ok atrasado
25 - frontend deve fazer os cruds, relacionamentos de projetos e permissoes
26 - aplicacao deve enviar emails
27 - relatorio alta diretoria
28 - desespero na escrita
29 - terminar a escrita.... hahahahaha!!! fudeu!!!
30 - mais um dia
31 - enviar tudo!



Para envio de emails:

amazon access key
        Access Key ID:
        AKIAJCKHKW3DYUVOBC3A
        Secret Access Key:
        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
    regiâo: sa-east-1

mailgun
    alexandre.oliva.dias@gmail.com
    user: mochileiro
    pass: resposta42

mandrill
    mochileiro42
    Resposta*42
    api key: 8ac09b65ecf4d3cc1143bd4fc326f49d-us18

google
    - desiste de tudo ai de cima... usa o google!



lexaton
26/05/18

blocos de horas:

13h00
- juntar frontend e backend... fazer um chamar o ourtro LOCALMENTE                  == ok
- descobrir e implementar melhor forma de distribuir o httpopitions no angular      == ok (fiz um interceptor meia boca)

14h30
- rearranjar codigo front-end para pegar tudo certo do backend (_id por id...)
- fazer os 3 cruds funcionarem 100%
* correção de erros na parte de mensagens entre front e back...
* ah... fiz um monte de correções, tentei fazer validação de formulário mas ainda não deu...
* finalizado crud indicadores

18h30
- tela permissões: listar todas permissões
- filtrar permissões por rota e mostrar na view
- alterar e salvar
- validação para alterar no frontend
- validação no servidor

00h30
* caralho... ainda nas Permissões... andando como uma tartaruga


27/05/18
só comecei as 17hs!!! fui ver corrida F1, deois na casa nos sogros... fudeu...
fiz algumas coisas...
21h00 agora é projeto!




para sabe sobre pagamentos e tutorias e entregas e etc...
Central de Informações da PUC Minas é o (31) 3319-4444.


coisas a fazer depois (se o povo da PUC perguntar)
paginação nas tabelas
filtros nas tabelas
activeGuard do angular para previnir mostrar rotas que o usuário não tem permissão




ante-penultimo dia!!!
já é noite!!!... bicho tá pegannnnnndo...

o que há nos exemplos de bons projetos?

- tamanho
TCC00 - 243 páginas >>> absurdo!
TCC01 - 96 páginas
TCC02 - 111 paginas >>> parece ser um bom exemplo a seguir
TCC03 - 109 paginas

- testes
TCC00 um deles tem evidências (prints com as telas e as situações narradas)
TCC01 tem só um tabelão de testes, nem mesmo divide por caso de uso
TCC02 tem teste de usuários com prints
TCC03 tem tabelas divididas por caso de uso


*/
