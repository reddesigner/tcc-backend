var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');

var userModel = require('../models/usuarios');
var permissionModel = require('../models/permissoes');

var config = require('../config');

router.use(function(req, res, next) {

    console.log('\n\nAutorizar.js --- Rota do tipo "middleware route".');

    //

    freeToGoCallback = function(){
        if (freeToGo) {
            console.log('\n\nautorizar.js --- free to go! NEXT()');
            next(); // faz com que a próxima rota e chamada e não pare o processamento por aqui
        } else {
            res.status(403);
            res.json({ message: 'Usuário não tem permissão de acesso.', type: 'error' });
            return;
        }
    }

    //

    // tokenRole é usada mais a frente para verificar view/role
    var tokenRole = '';
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
                tokenRole = req.decoded.role; // usado na verificação de permissões
                console.log('\n\nAUTORIZAR.JS, 53\nToken.');
                console.dir(req.decoded)
            }
        });
        //
        var futureUrl = req.url;
        var freeToGo = false;
        permissionModel.find({
            //route: req.url
            role: tokenRole
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
            var permList = '';
            perm.forEach(element => {
                if (permList.length>0)
                    permList += ',';
                permList += element.route;
console.log('\nautorizar.js --- ok, dentro do forEach', futureUrl);
                if (futureUrl.indexOf(element.route) >= 0) {
console.log('\nautorizar.js --- noooooooooooooooo, permissão ainda não encontrada para role '+tokenRole+' na rota '+element.route);
                    if (element.role.indexOf(tokenRole) >= 0) {
console.log('\nautorizar.js --- ok, permissão encontrada para role '+tokenRole+' na rota '+element.route);
                        freeToGo = true;
                    } /*else if (element.role.length == 0) { // se não houver role indicado todos podem usar rota (desde que logados) ?
                        freeToGo = true;
                    }*/
                }
            });
            res.setHeader('x-permissions', '/home,/autenticar,' + permList);
            freeToGoCallback(); // calback para garantir que o lean().exec() seja executado e só então verificar se vai para o next()
        });

    } else {

        console.log('\n\nAUTORIZAR.JS, 111\nToken não existe.');
        // verificar se é rota /autenticar
        if (req.url.indexOf('/autenticar') == 0) {
            console.log('autorizar.js ---  ... mas rota é /autenticar... ou seja, pode ir para o next()');
            next();
        } else {
            // se não houver token retorna msg de erro
            // deve sempre haver um token (usário logado) com excessão da rota /autenticar
            console.log('\n\nAUTORIZAR.JS, 120\nAcesso negado...');
            return res.status(403).send({ 
                message: 'Nenhum token foi informado pela requisição. Acesso restringido.',
                type: 'error'
            });
        }

    }

});

module.exports = router;