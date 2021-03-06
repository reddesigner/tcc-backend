var express = require('express');
var route = express.Router();

var bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

var projetoModel = require('../models/projetos');
var userModel = require('../models/usuarios');

route.get('/', function(req, res){
    console.log('-\nGET em projetos');
    projetoModel.find(function(err, prjs){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
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
    Projeto.dateStart = req.body.dateStart, // Date.now() ...... não, pode ter começado em outro dia... pode ter default, mas deve poder ser alterado!
    Projeto.dateEnd = req.body.dateEnd;
    Projeto.datePrevision = req.body.datePrevision;
    Projeto.status = req.body.status;
    Projeto.description = req.body.description;
    Projeto.budget = req.body.budget;
    Projeto.risk = req.body.risk;
    Projeto.manager = req.body.manager; // _id name email role
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
            res.status(400);
            res.json({ message: 'Erro na inclusão de Projetos', type: 'error' });
            return;
        }
        // Devolve o objeto salvo
        res.status(201);
        res.json(prj);
    });
});

route.get('/manager', function(req, res){
    console.log('-\nGET managers em projetos');
    userModel.find({ role: 'Gerente de Projeto'}).lean().exec(function(err, obj){
        if (err) {
            // retorna mensagem de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de gerentes para um Projeto', type: 'error' });
            return;
        }
        res.json(obj);
    });
});

route.get('/:id', function(req, res){
    console.log('-\nGET com ID em projetos');
    console.log(req.params.id);
    projetoModel.findById(req.params.id).lean().exec(function(err, prj){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de um Projeto por ID', type: 'error' });
            return;
        }
        // prj['__meta'] = "meta informação...";
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
            res.status(400);
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
        prj.dateChangeStatus = req.body.dateChangeStatus;
        prj.userChangeStatus = req.body.userChangeStatus; // _id name email role
        prj.description = req.body.description;
        prj.budget = req.body.budget;
        prj.risk = req.body.risk;
        prj.manager = req.body.manager; // _id name email role
        // relacionamentos [ não são atualizados aqui! ]
        //prj.manager = {};
        //prj.indicators = [];
        //prj.team = [];
/*
        if (req.body.risk == "Alto"){
            var CronJob = require('cron').CronJob;
            var job = new CronJob('00 30 11 * * 5', function() {
            // acompanhamento mensal
            }, function () {
                // This function is executed when the job stops
                console.log('cron terminou');
            },
            true // Start the job right now
            );
        }
        */

        prj.save(function(err, prja){
            if (err) {
                // retorna mensagem de erro
                // TODO retornar código http de erro
                res.status(400);
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
            res.status(400);
            res.json({ message: 'Erro ao excluir elemento de Projetos', type: 'error' });
            return;
        }
        res.json({ message: 'Item excluído com sucesso!', type: 'success' });
    });
});

module.exports = route;