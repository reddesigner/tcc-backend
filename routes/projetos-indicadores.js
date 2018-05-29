var express = require('express');
var route = express.Router();

var bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

var projetoModel = require('../models/projetos');

// não há necessidade um GET simples, tem que haver id do projeto sempre
route.get('/:idProjeto', function(req, res){
    console.log('-\nGET com ID em projetos x indicadores');
    projetoModel.findById(req.params.idProjeto, function(err, prj){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na recuperação de Projetos/Indicadores com ID', type: 'error' });
            return;
        }
        res.json(prj);
    });
});

// não há POST, apenas PUT
route.put('/:idProjeto', function(req, res){
    console.log('-\nPUT em projetos x indicadores');
    console.log(req.params.id);
    projetoModel.findById(req.params.idProjeto, function(err, prj) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na fase de recuperação de um Projeto/Indicadores por ID para edição', type: 'error' });
            return;
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        // nomes dos campos no formulario deve ser: ind[0][_id], ind[0][name]...
        if (req.body.ind != undefined) {
            prj.indicators = req.body.ind;
        } else {
            prj.indicators = [];
        }
        // TODO se nada for enviado, dará algum erro?
    
        prj.save(function(err, prja){
            if (err) {
                // retorna mensagem de erro
                // TODO retornar código http de erro
                res.json({ message: 'Erro na edição de Projetos/Indicadores', type: 'error' });
                return;
            }
            // Devolve o objeto salvo
            res.json(prja);
        });

    });
});

module.exports = route;