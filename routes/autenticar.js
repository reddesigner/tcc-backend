var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');

var userModel = require('../models/usuarios');

var config = require('../config');

router.post('/', function(req, res) {

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
            console.log('.............. o resultado da comparação assincrona com hash de senhas é: ');
            console.dir(compare);

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
                    expiresIn: 60 * 60 * 24 // expira em segundos: 60 * 60 * 24 = 24 horas
                });

                // retorna o token
                res.json({
                    message: 'Usuário verificado no sistema.',
                    type: 'success',
                    'x-user-name': user.name,
                    'x-user-email': user.email,
                    'x-user-role': user.role,
                    'x-access-token': token
                });
            }
  
        }
  
    });
  });

  module.exports = router;