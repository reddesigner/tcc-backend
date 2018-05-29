var express = require('express');
var router = express.Router();

var util = require('../extra/util');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var userModel = require('../models/usuarios');

router.get('/', function(req, res){
    userModel.find({}, '-password', function(err, usrs){ // volta todos os campos menos o password
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de Usuários', type: 'error' });
            return;
        }
        res.json(usrs);
    });
});

router.post('/', function(req, res){
    console.log('post em usuários');
    // cria instancia do módulo
    var User = new userModel();
    // TODO validar requisição
    // recebe os valores da requisição
    User.name = req.body.name;
    User.email = req.body.email;
    var passwordTemp;
    if (req.body.password == '' || req.body.password == undefined) {
        passwordTemp = 's' + util.makeid(); // + Math.floor(1000 + Math.random() * 9000);
        User.password = passwordTemp;
    } else
        User.password = req.body.password;
    User.role = req.body.role;

    User.save(function(err, usr){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
            if (err.code == 11000) // código para campo único
                res.json({ message: 'Erro na inclusão de Usuário. Email já existe na base.', type: 'error' });
            else
                res.json({ message: 'Erro na inclusão de Usuário', type: 'error' });
            console.dir(err);
            return;
        }
        // enva email para usuário com senha temporária
        if (passwordTemp)
            console.log('password temorário!!!!!!!', passwordTemp);
        // Devolve o objeto salvo
        res.status(201);
        res.json(usr);
    });
});

router.get('/:id', function(req, res){
    userModel.findById(req.params.id, '-password', function(err, usr){ // volta todos os campos menos o password (levemente diferente do find() lá de cima)
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de um Usuário por ID', type: 'error' });
            return;
        }
        res.json(usr);
    });
});

router.put('/:id', function(req, res){
    console.log('put em usuario', req.body);
    userModel.findById(req.params.id, function(err, usr) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
            res.json({ message: 'Erro na fase de recuperação de um Usuário por ID para edição', type: 'error' });
            return;
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        if (req.body.name != undefined)
            usr.name = req.body.name;
        if (req.body.email != undefined)
            usr.email = req.body.email;
        if (req.body.password != undefined)
            usr.password = req.body.password;
        if (req.body.role != undefined)
            usr.role = req.body.role;
        if (req.body.firsttime != undefined)
            usr.firsttime = req.body.firsttime;
        var passwordTemp;
        if (req.body.firsttime == true) {
            passwordTemp = 's' + util.makeid();
            usr.password = passwordTemp;
        }
    
        usr.save(function(err, usra){
            if (err) {
                // retorna mensagem de erro
                // TODO retornar código http de erro
                res.status(400);
                res.json({ message: 'Erro na edição de Usuário', type: 'error' });
                return;
            }
            // enva email para usuário com senha temporária
            if (passwordTemp)
                console.log('password temorário!!!!!!!', passwordTemp);
            // Devolve o objeto salvo
            res.status(201);
            res.json(usra);
        });

    });
});

router.delete('/:id', function(req, res) {
    console.log('delete em usuários');
    userModel.remove({_id: req.params.id}, function(err, usr) {
        if (err) {
            res.status(400);
            res.json({ message: 'Erro ao excluir elemento de Usuários', type: 'error' });
            return;
        }
        res.json({ message: 'Item excluído com sucesso!', type: 'success' });
    });
});

module.exports = router;