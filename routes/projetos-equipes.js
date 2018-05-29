var express = require('express');
var route = express.Router();

var bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

var projetoModel = require('../models/projetos');

// não há necessidade um GET simples, tem que haver id do projeto sempre
route.get('/:idProjeto', function(req, res){
    console.log('-\nGET com ID em projetos x equipes');
    projetoModel.findById(req.params.idProjeto, function(err, prj){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na recuperação de Projetos/Equipes com ID', type: 'error' });
            return;
        }
        res.json(prj);
    });
});

// não há POST, apenas PUT
route.put('/:idProjeto', function(req, res){
    console.log('-\nPUT em projetos x equipes');
    console.log(req.params.idProjeto);
    projetoModel.findById(req.params.idProjeto, function(err, prj) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na fase de recuperação de um Projeto/Equipes por ID para edição', type: 'error' });
            return;
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        // nomes dos campos no formulario deve ser: team[0][_id], team[0][name]...
        console.log('o time enviado no put', req.body.team);
        if (req.body.team != undefined) {
            prj.team = req.body.team;
        } else {
            prj.team = [];
        }
        // TODO se nada for enviado, dará algum erro?
    
        prj.save(function(err, prja){
            if (err) {
                // retorna mensagem de erro
                // TODO retornar código http de erro
                res.json({ message: 'Erro na edição de Projetos/Equipes', type: 'error' });
                return;
            }
            // Devolve o objeto salvo
            res.json(prja);
        });

    });
});

module.exports = route;