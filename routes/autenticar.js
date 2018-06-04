var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');

var userModel = require('../models/usuarios');
var permissionModel = require('../models/permissoes');

var config = require('../config');

router.post('/', function(req, res) {

    console.log('AUTENTICAR.JS - vieram os campos...');
    console.log('email', req.body.email);
    console.log('password', req.body.password);
    // encotrar o usuário
    userModel.findOne({
        email: req.body.email
    }, async function(err, user) {
  
        if (err) {
            res.status(400);
            res.json({ message: 'Erro na autenticação', type: 'error' });
            return;
        }
  
        if (!user) {
            res.status(400);
            res.json({ message: 'Usuário não é válido.', type: 'error' });
            return;
        } 
      
        else if (user) {
  
            // verificar password
            var compare = await user.isValidPassword(req.body.password);
            console.log('.............. o resultado da comparação assincrona com hash de senhas é: ', compare);

            //if (user.password != req.body.password) {
            if (!compare) {
                res.status(400);
                res.json({ message: 'A senha informada é inválida.' });
                return;
            } else {
                // usuário encontrado e password válido
                // criar o token (com dados do 'payload')
                const payload = {
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 60 * 3 // formato: segundos * minutos * horas... explemplo de expiraçãos: 60 * 60 * 24 = 24 horas, ou então 60 * 10 = 10 minutos...
                });

                // pega as permissões do papel do usuário
                var userPerm = '';
                permissionModel.find({
                    role: user.role
                }, function(err, perms) {
                    if (err) {
                        res.status(400);
                        res.json({ message: 'Erro na recuperação de Permissões por Perfil ao autenticar', type: 'error' });
                        return;
                    }
                    //userPerm = perms;
                    console.log('\n\n\n---------->>>>>>', perms);
                    perms.forEach(el => {
                        userPerm += ',' + el.route;
                    });
                    console.log('\n\n---------->>>>>>', userPerm);

                    // retorna o token
                    res.status(200);
                    res.setHeader('x-permissions', '/home,/autenticar' + userPerm);
                    res.json({
                        message: 'Usuário verificado no sistema.',
                        type: 'success',
                        action: 'logged in',
                        'x-user-name': user.name,
                        'x-user-email': user.email,
                        'x-user-role': user.role,
                        'x-access-token': token,
                        'x-permissions': userPerm
                    });
                });

            }
  
        }
  
    });
  });

  module.exports = router;