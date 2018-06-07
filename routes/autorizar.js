var express = require('express');
var router = express.Router();

var checker = require('../extra/check');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');

var userModel = require('../models/usuarios');
var permissionModel = require('../models/permissoes');

var config = require('../config');

router.use(function(req, res, next) {

    console.log('\n------------------------------------------------\n\nAutorizar.js --- "middleware route". Validando TOKEN');

    //

    var refresh = ''; // refresh token

    //

    // verifica o header ou url ou corpo do post pelo token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
    // decodifica o token
    if (token && token != '') {

        //console.log('\nToken existe.');
        // verifica o segredo
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                console.log('\n\nAUTORIZAR.JS, 43\nFalha autenticação de token de segurança.', err.message);
                res.status(403);
                res.json({ message: 'Falha na autenticação to token de segurança. (' + err.message + ')', type: 'error' });
                throw('exit'); // lança excessão para cancelar execução de fluxo
                //exit();
                //return;
            } else {
                // se tudo estiver ok o token decodificado vai para a requisição
                req.decoded = decoded;
                console.log('\n\nAUTORIZAR.JS,\nToken.');
                console.dir(req.decoded);
                // refresh token
                const payload = {
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role
                };
                refresh = jwt.sign(payload, config.secret, {
                    expiresIn: 60 * 3 // formato: segundos * minutos * horas... explemplo de expiraçãos: 60 * 60 * 24 = 24 horas, ou então 60 * 10 = 10 minutos...
                });
                res.setHeader('x-refresh', refresh);
            }
        });
        //
        //console.log('\n\nAUTORIZAR.JS\nNEXT 1.', req.url);
        var permList;
        permList = checker.checkPermission(req, function(lista){
            //console.log('---- callback!!!!!');
            permList = lista;
            if ( permList ) {
                res.header('x-permissions', '/home,/autenticar,' + permList);
                next();
            }
        });

        //return;

    } else {

        console.log('\n\nAUTORIZAR.JS\nToken não existe.');
        // verificar se é rota /autenticar
        if (req.url.indexOf('/autenticar') == 0) {
            console.log('autorizar.js ---  ... mas rota é /autenticar... ou seja, pode ir para o next()');
            console.log('\n\nAUTORIZAR.JS\nNEXT 2.');
            next();
            //return;
        } else {
            // se não houver token retorna msg de erro
            // deve sempre haver um token (usário logado) com excessão da rota /autenticar
            console.log('\n\nAUTORIZAR.JS\nAcesso negado...');
            return res.status(403).send({ 
                message: 'Nenhum token foi informado pela requisição. Acesso restringido.',
                type: 'error'
            });
        }

    }

});

// --- //
/*
router.use(function(req, res, next) {

    console.log('\n\nAutorizar.js --- "middleware route". Tratando Permissões');

    //

    var permList = ''; // lista de permissões

    //

    if (!req.decoded) {
        console.log('\n\nAUTORIZAR.JS\nNEXT 3.');
        next();
        return;
    }

    freeToGoCallback = function(){
        if (freeToGo) {
            console.log('\n\nautorizar.js --- free to go! NEXT()');
            if (!res.headersSent){
                //if (refresh)
                    //res.header('x-refresh', refresh);
                res.header('x-permissions', '/home,/autenticar,' + permList);
            
            console.log('\n\nAUTORIZAR.JS\nNEXT 4. --- url: ', req.url);
            next(); // faz com que a próxima rota e chamada e não pare o processamento por aqui
            }
            return;
        } else {
            res.status(403);
            res.json({ message: 'Usuário não tem permissão de acesso.', type: 'error' });
            return;
        }
    }

    //

    var _url = req.url;
    var _role = req.decoded.role;

    permissionModel.find({
        //route: req.url
        role: _role
    }).lean().exec(function(err, perm) {
        if (err) {
            console.log('\n\nAUTORIZAR.JS - Falha na comparação de permissões de views/roles.');
            res.status(400);
            res.json({ message: 'Falha na consulta de permissões da aplicação.', type: 'error' });
            return;
        }
        //console.log('\nautorizar.js --- perm', perm);
        if (typeof perm !== 'undefined' && perm.length > 0) { 
        //if (perm.lenght == 0 || perm.lenght == undefined) {
            console.log('\nautorizar.js --- ok, existe o objeto permission... agora é fazer a checkagem de permissão/perfil', perm);
            //freeToGo = false;
        } else {
            freeToGo = true;
        }
        //
        perm.forEach(element => {
            if (permList.length>0)
                permList += ',';
            permList += element.route;
//console.log('\nautorizar.js --- ok, dentro do forEach', _url);
            if (_url.indexOf(element.route) >= 0) {
//console.log('\nautorizar.js --- noooooooooooooooo, permissão ainda não encontrada para role '+_role+' na rota '+element.route);
                if (element.role.indexOf(_role) >= 0) {
//console.log('\nautorizar.js --- ok, permissão encontrada para role '+_role+' na rota '+element.route);
                    freeToGo = true;
                }//else if (element.role.length == 0) { // se não houver role indicado todos podem usar rota (desde que logados) ?
                //    freeToGo = true;
                //}
            }
        });
        freeToGoCallback(); // calback para garantir que o lean().exec() seja executado e só então verificar se vai para o next()
    });

});
*/
module.exports = router;