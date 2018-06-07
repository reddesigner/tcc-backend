var express = require('express');
var route = express.Router();

// filtra os projetos por um perído de datas
// ou mostra os dados de um único projeto

// os dados dos projetos são mostrados
// realçando o STATUS e os INDICADORES

// é preciso mostrar STATUS de cancelados
// INDICADORES fora dos valores de referência

// get projetos
// varre array fazendo verificações

var bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

var projetoModel = require('../models/projetos');

route.get(
    ['/', '/:id', '/datestartlt/:datestartlt', '/dategte/:dategte', '/dates/:date1/:date2'], 
    function(req, res){
    /*console.log(req.params.date1);
    console.log(req.params.date2);
    var dbFoundtest = projetoModel.find({
        "dateStart": {"$gte": req.params.date1, "$lt": req.params.date2}
    });
    dbFoundtest.exec(function(err, prjs) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            //res.status(400);
            //res.json({ message: 'Erro na recuperação de Projetos para relatório', type: 'error' });
            console.log('erradinho', err);
            return;
        }
        //res.json(prjs);
        console.log('certo', prjs);
    });
    */

    //

    var filter = {};
    if (req.params.id)
        filter._id = req.params.id;

    console.log('-\nGET em projetos [relatorios]');
    var dbFound = projetoModel.find(filter);
    dbFound.lean().exec(function(err, prjs) {
        if (err) {
            // retorna mensagem de erro
            // TODO retornar código http de erro
            res.status(400);
            res.json({ message: 'Erro na recuperação de Projetos para relatório', type: 'error' });
            return;
        }
        var metadata = [];
        // mágica dos indicadores
        for (var t=0; t<prjs.length; t++){
            for (var c=0; c<prjs[t].phases.phase1.length; c++){
                if (prjs[t].phases.phase1[c].value < prjs[t].phases.phase1[c].min || prjs[t].phases.phase1[c].value > prjs[t].phases.phase1[c].max) {
                    prjs[t].flagged = true;
                    prjs[t].phases.phase1[c].flagged = true;
                    prjs[t].phases.phase1sum = (prjs[t].phases.phase1sum ? prjs[t].phases.phase1sum + 1 : 1);
                    //metadata
                }
            }
            for (var c=0; c<prjs[t].phases.phase2.length; c++){
                if (prjs[t].phases.phase2[c].value < prjs[t].phases.phase2[c].min || prjs[t].phases.phase2[c].value > prjs[t].phases.phase2[c].max) {
                    prjs[t].flagged = true;
                    prjs[t].phases.phase2[c].flagged = true;
                    prjs[t].phases.phase2sum = (prjs[t].phases.phase2sum ? prjs[t].phases.phase2sum + 1 : 1);
                    //metadata
                }
            }
            for (var c=0; c<prjs[t].phases.phase3.length; c++){
                if (prjs[t].phases.phase3[c].value < prjs[t].phases.phase3[c].min || prjs[t].phases.phase3[c].value > prjs[t].phases.phase2[c].max) {
                    prjs[t].flagged = true;
                    prjs[t].phases.phase3[c].flagged = true;
                    prjs[t].phases.phase3sum = (prjs[t].phases.phase3sum ? prjs[t].phases.phase3sum + 1 : 1);
                    //metadata
                }
            }
            for (var c=0; c<prjs[t].phases.phase4.length; c++){
                if (prjs[t].phases.phase4[c].value < prjs[t].phases.phase4[c].min || prjs[t].phases.phase4[c].value > prjs[t].phases.phase4[c].max) {
                    prjs[t].flagged = true;
                    prjs[t].phases.phase4[c].flagged = true;
                    prjs[t].phases.phase4sum = (prjs[t].phases.phase4sum ? prjs[t].phases.phase4sum + 1 : 1);
                    //metadata
                }
            }
            // formatar datas para retorno
            if (prjs[t].dateStart) {
                let ds = new Date(prjs[t].dateStart);
                let ds1 = ds.getDate();
                let ds2 = ds.getMonth();
                let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
                prjs[t].dateStartReport = dss;
            }
            if (prjs[t].datePrevision) {
                let ds = new Date(prjs[t].datePrevision);
                let ds1 = ds.getDate();
                let ds2 = ds.getMonth();
                let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
                prjs[t].datePrevisionReport = dss;
            }
            if (prjs[t].dateEnd) {
                let ds = new Date(prjs[t].dateEnd);
                let ds1 = ds.getDate();
                let ds2 = ds.getMonth();
                let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
                prjs[t].dateEndReport = dss;
            }
            if (prjs[t].dateChangeStatus) {
                let ds = new Date(prjs[t].dateChangeStatus);
                let ds1 = ds.getDate();
                let ds2 = ds.getMonth();
                let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
                prjs[t].dateChangeStatusReport = dss;
            }
            // valores padrão
            if (!prjs[t].userChangeStatus) { prjs[t].userChangeStatus }
        }
        //
        res.json(prjs);
    });
});

module.exports = route;