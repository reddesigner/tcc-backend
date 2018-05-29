var express = require('express');
var route = express.Router();

var bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

var projetoModel = require('../models/projetos');

route.get('/', function(req, res){
    console.log('-\nGET em projetos');
    projetoModel.find(function(err, prjs){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na recuperação de Projetos', type: 'error' });
            return;
        }
        res.json(prjs);
    });
});

route.post('/', function(req, res){
    console.log('-\nPOST em projetos');
    console.dir(req.body);
    // cria instancia do módulo
    var Projeto = new projetoModel();
    // TODO validar requisição
    // recebe os valores da requisição
    Projeto.name = req.body.name;
    Projeto.dateStart = req.body.datestart, // Date.now() ...... não, pode ter começado em outro dia... pode ter default, mas deve poder ser alterado!
    Projeto.dateEnd = req.body.dateend;
    Projeto.datePrevision = req.body.dateprevision;
    Projeto.status = req.body.status;
    Projeto.description = req.body.description;
    Projeto.budget = req.body.budget;
    Projeto.risk = req.body.risk;
    //justification =
    //Projeto.dateChangeStatus =
    //Projeto.userChangeStatus = {};
    // relacionamentos
    //Projeto.indicators = [];
    //Projeto.team = [];

    Projeto.save(function(err, prj){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na inclusão de Projetos', type: 'error' });
            return;
        }
        // Devolve o objeto salvo
        res.json(prj);
    });
});

route.get('/:id', function(req, res){
    console.log('-\nGET com ID em projetos');
    console.log(req.params.id);
    projetoModel.findById(req.params.id, function(err, prj){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na recuperação de um Projeto por ID', type: 'error' });
            return;
        }
        res.json(prj);
    });
});

route.put('/:id', function(req, res){
    console.log('-\nPUT em projetos');
    console.log(req.params.id);
    projetoModel.findById(req.params.id, function(err, prj) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na fase de recuperação de um Projeto por ID para edição', type: 'error' });
            return;
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        prj.name = req.body.name;
        prj.dateStart = req.body.dateStart,
        prj.dateEnd = req.body.dateEnd;
        prj.datePrevision = req.body.datePrevision;
        prj.status = req.body.status;
        prj.justification = req.body.justification;
        prj.description = req.body.description;
        prj.budget = req.body.budget;
        prj.risk = req.body.risk;
        // relacionamentos [ não são atualizados aqui! ]
        //prj.manager = {};
        //prj.indicators = [];
        //prj.team = [];
    
        prj.save(function(err, prja){
            if (err) {
                // retorna mensagem de erro
                // TODO retornar código http de erro
                res.json({ message: 'Erro na edição de Projetos', type: 'error' });
                return;
            }
            // Devolve o objeto salvo
            res.json(prja);
        });

    });
});

route.delete('/:id', function(req, res) {
    console.log('-\nDELETE em projetos');
    console.log(req.params.id);
    projetoModel.remove({_id: req.params.id}, function(err, prj) {
        if (err) {
            res.json({ message: 'Erro ao excluir elemento de Projetos', type: 'error' });
            return;
        }
        res.json({ message: 'Item excluído com sucesso!', type: 'success' });
    });
});

module.exports = route;