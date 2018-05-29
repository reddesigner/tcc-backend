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

    console.log('\nRota do tipo "middleware route".');
    // role é usada mais a frente para verificar view/role
    var role = '';
    // verifica o header ou url ou corpo do post pelo token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
    // decodifica o token
    if (token && token != '') {
        //console.log('\nToken existe.');
        // verifica o segredo
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                console.log('\nFalha autenticação de token de segurança.', err.message);
                res.status(403);
                res.json({ message: 'Falha na autenticação to token de segurança.', type: 'error' });
                throw('exit'); // lança excessão para cancelar execução de fluxo
                //exit();
                //return;
            } else {
                // se tudo estiver ok o token decodificado vai para a requisição
                req.decoded = decoded;
                role = req.decoded.role; // usado na verificação de permissões
                console.log('\nToken.');
                console.dir(req.decoded)
            }
        });
        //
        var futureUrl = req.url;
        var freeToGo = false;
        var dbFound = permissionModel.find({
            route: req.url
        });
        dbFound.lean().exec(function(err, perm) {
            if (err) {
                console.log('\nFalha na comparação de permissões de views/roles.');
                res.status(400);
                res.json({ message: 'Falha na consulta de permissões da aplicação.', type: 'error' });
                return;
            }
            // TODO remodelar? fazer um array com mais de um perfil por tela?
            perm.forEach(element => {
                if (element.route == futureUrl) {
                    /*--*/
                    if (element.role == role) {
                        freeToGo = true;
                    } else if (element.role == '') { // se não houver role indicado todos podem usar rota (desde que logados)
                        freeToGo = true;
                    }
                    /*--*/
                    /*
                    ------- esta aqui é a forma de proucrar dentro da ARRAY... lá em cima era apenas uma string simples em cada registro...
                    if (element.role.indexOf(role) >= 0) {
                        freeToGo = true;
                    } else if (element.role.length == 0) { // se não houver role indicado todos podem usar rota (desde que logados)
                        freeToGo = true;
                    }
                    */
                }
            });
            freeToGoCallback(); // calback para garantir que o lean().exec() seja executado e só então verificar se vai para o next()
        });
    } else {
        console.log('\nToken não existe.');
        // verificar se é rota /autenticar
        if (req.url.indexOf('/autenticar') == 0) {
            console.log('.. mas rota é /autenticar... ou seja, pode ir para o next()');
            next();
        } else {
            // se não houver token retorna msg de erro
            // deve sempre haver um token (usário logado) com excessão da rota /autenticar
            console.log('Acesso negado...');
            return res.status(403).send({ 
                message: 'Nenhum token foi informado pela requisição. Acesso restringido.',
                type: 'error'
            });
        }
    }

    //

    freeToGoCallback = function(){
        if (freeToGo) {
            next(); // faz com que a próxima rota e chamada e não pare o processamento por aqui
        } else {
            res.status(403);
            res.json({ message: 'Usuário não tem permissão de acesso.', type: 'error' });
            return;
        }
    }

});

module.exports = router;