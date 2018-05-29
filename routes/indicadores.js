var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var indicatorModel = require('../models/indicadores');

router.get('/', function(req, res){
    console.log('get em indicadores');
    indicatorModel.find(function(err, objs){
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de Indicadores', type: 'error' });
            return;
        }
        res.json(objs);
    });
});

router.post('/', function(req, res){
    console.log('post em indicadores', req.body.name);
    // cria instancia do módulo
    var indicator = new indicatorModel();
    // validar requisição
    if (req.body.name == '') {
        res.status(400);
        res.json({ message: 'Erro na inclusão de Indicador. O nome não pode ser vazio.', type: 'error' });
        return;
    }
    // recebe os valores da requisição
    indicator.name = req.body.name;

    indicator.save(function(err, obj){
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na inclusão de Indicador', type: 'error' });
            return;
        }
        // Devolve o objeto salvo
        res.json(obj);
    });
});

router.get('/:id', function(req, res){
    indicatorModel.findById(req.params.id, function(err, obj){
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de um Indicador por ID', type: 'error' });
            return;
        }
        res.json(obj);
    });
});

router.put('/:id', function(req, res){
    console.log('put em indicadores');
    indicatorModel.findById(req.params.id, function(err, obj) {
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na fase de recuperação de um Indicador por ID para edição', type: 'error' });
            return;
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        obj.name = req.body.name;
        obj.email = req.body.email,
        obj.password = req.body.password;
    
        obj.save(function(err, obja){
            if (err) {
                // retorna mensagem de erro
                res.status(400);
                res.json({ message: 'Erro na edição de Indicador', type: 'error' });
                return;
            }
            // Devolve o objeto salvo
            res.json(obja);
        });

    });
});

router.delete('/:id', function(req, res) {
    console.log('delete em indicadores');
    indicatorModel.remove({_id: req.params.id}, function(err, obj) {
        if (err) {
            res.status(400);
            res.json({ message: 'Erro ao excluir elemento de Indicador', type: 'error' });
            return;
        }
        res.json({ message: 'Item excluído com sucesso!', type: 'success' });
    });
});

module.exports = router;