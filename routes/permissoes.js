var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var permissionModel = require('../models/permissoes');

// get
router.get('/', function(req, res){
    console.log('get em permissões');
    permissionModel.find(function(err, objs){
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de Permissões por Perfil', type: 'error' });
            return;
        }
        res.json(objs);
    });
});

// put
router.put('/:id', function(req, res){
    console.log('\nPUT em permissões');
    permissionModel.findById(req.params.id, function(err, obj) {
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na fase de recuperação de uma Permissões por Perfil através de ID para edição', type: 'error' });
            return;
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        obj.role = req.body.role;
//console.log('a rota é', req.body.route);
//console.log('a view é', req.body.view);
        if (req.body.route != '' && req.body.route != undefined)
            obj.route = req.body.route;
        if (req.body.view != '' && req.body.view != undefined)
            obj.view = req.body.view;
    
        obj.save(function(err, obja){
            if (err) {
                // retorna mensagem de erro
                res.status(400);
                res.json({ message: 'Erro na edição de Permissões por Perfil', type: 'error' });
                return;
            }
            // Devolve o objeto salvo
            res.json(obja);
        });

    });
});

// não pode ter novas telas/views nem deletar as atuais (nem post, nem delete)

module.exports = router;