var express = require('express');
var route = express.Router();

var bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

var projetoModel = require('../models/projetos');

// não há necessidade um GET simples, tem que haver id do projeto sempre
route.get('/:idProjeto', function(req, res){
    console.log('-\nGET com ID em projetos x indicadores x fases');
    projetoModel.findById(req.params.idProjeto, function(err, prj){
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na recuperação de Projetos/Indicadores/Fases com ID', type: 'error' });
            return;
        }
        res.json(prj);
    });
});

// não há POST, apenas PUT
route.put('/:idProjeto', function(req, res){
    console.log('-\nPUT em projetos x indicadores x fases');
    console.log(req.params.idProjeto);
    projetoModel.findById(req.params.idProjeto, function(err, prj) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.json({ message: 'Erro na fase de recuperação de um Projeto/Indicadores/Fases por ID para edição', type: 'error' });
            return;
        }

        // TODO
        // fazer loop em todos indicadores em todas as fazes e contar os que estão fora do limite
        // fazer loop nos novos indicadores e fases e somá-los caso sejam de fases diferentes
        // se soma for maior que 3, enviar email!
        let alertCounter_1 = 0;
        let alertCounter_2 = 0;
        let alertCounter_3 = 0;
        let alertCounter_4 = 0;
        for (let i=0; i<prj.phases.phase1.length; i++){
            let val = prj.phases.phase1[i].value;
            let min = prj.phases.phase1[i].min;
            let max = prj.phases.phase1[i].max;
            if (val < min || val > max) {
                alertCounter_1++;
            }
        }
        for (let i=0; i<prj.phases.phase2.length; i++){
            let val = prj.phases.phase2[i].value;
            let min = prj.phases.phase2[i].min;
            let max = prj.phases.phase2[i].max;
            if (val < min || val > max) {
                alertCounter_2++;
            }
        }
        for (let i=0; i<prj.phases.phase3.length; i++){
            let val = prj.phases.phase3[i].value;
            let min = prj.phases.phase3[i].min;
            let max = prj.phases.phase3[i].max;
            if (val < min || val > max) {
                alertCounter_3++;
            }
        }
        for (let i=0; i<prj.phases.phase4.length; i++){
            let val = prj.phases.phase4[i].value;
            let min = prj.phases.phase4[i].min;
            let max = prj.phases.phase4[i].max;
            if (val < min || val > max) {
                alertCounter_4++;
            }
        }

        // TODO validar requisição [ tenho que verificar qual veio para ser alterado! ]
        // recebe os valores da requisição
        // nomes dos campos no formulario deve ser: f1[0][_id], f1[0][name]... f2[0][_id], f2[0][name]... até f4[0][_id], f4[0][name]
        if (req.body.phases.phase1 != undefined) {
            prj.phases.phase1 = req.body.phases.phase1;
            //
            alertCounter_1 = 0;
            for (let i=0; i<req.body.phases.phase1.length; i++){
                let val = req.body.phases.phase1[i].value;
                let min = req.body.phases.phase1[i].min;
                let max = req.body.phases.phase1[i].max;
                if (val < min || val > max) {
                    alertCounter_1++;
                }
            }
        } /*else { 
            prj.phases.phase1 = [];
        }*/
        
        if (req.body.phases.phase2 != undefined) {
            prj.phases.phase2 = req.body.phases.phase2;
            //
            alertCounter_2 = 0;
            for (let i=0; i<req.body.phases.phase2.length; i++){
                let val = req.body.phases.phase2[i].value;
                let min = req.body.phases.phase2[i].min;
                let max = req.body.phases.phase2[i].max;
                if (val < min || val > max) {
                    alertCounter_2++;
                }
            }
        } /*else { 
            prj.phases.phase2 = [];
        }*/

        if (req.body.phases.phase3 != undefined) {
            prj.phases.phase3 = req.body.phases.phase3;
            //
            alertCounter_3 = 0;
            for (let i=0; i<req.body.phases.phase3.length; i++){
                let val = req.body.phases.phase3[i].value;
                let min = req.body.phases.phase3[i].min;
                let max = req.body.phases.phase3[i].max;
                if (val < min || val > max) {
                    alertCounter_3++;
                }
            }
        } /*else { 
            prj.phases.phase3 = [];
        }*/
        
        if (req.body.phases.phase4 != undefined) {
            prj.phases.phase4 = req.body.phases.phase4;
            //
            alertCounter_4 = 0;
            for (let i=0; i<req.body.phases.phase4.length; i++){
                let val = req.body.phases.phase4[i].value;
                let min = req.body.phases.phase4[i].min;
                let max = req.body.phases.phase4[i].max;
                if (val < min || val > max) {
                    alertCounter_4++;
                }
            }
        } /*else { 
            prj.phases.phase4 = [];
        }*/
        // TODO se nada for enviado, dará algum erro?

        // enviar email ?
        console.log('alertas', alertCounter_1 + alertCounter_2 + alertCounter_3 + alertCounter_4);
        if (alertCounter_1 + alertCounter_2 + alertCounter_3 + alertCounter_4 > 3) {
            // send email !!!
            console.log('enviando email...');
        }
    
        prj.save(function(err, prja){
            if (err) {
                // retorna mensagem de erro
                // TODO retornar código http de erro
                res.json({ message: 'Erro na edição de Projetos/Indicadores/Fases', type: 'error' });
                return;
            }
            // Devolve o objeto salvo
            res.json(prja);
        });

    });
});

module.exports = route;