var CronJob = require('cron').CronJob;

var projetoModel = require('../models/projetos');

cron = {

    initWeek: function(){
        var job = new CronJob('30 * * * * *', function() {
        //var job = new CronJob('00 30 11 * * 5', function() {
            // acompanhamento semanal de projetos de risco alto
            // TODO alerta na interface?
            projetoModel.find({ 
                "risk": "Alto"
            }).exec((err, obj)=>{
                if (err) {
                    // erro...
                    console.log("Erro no cronometro semanal...");
                    return;
                }
                obj.forEach(element => {
                    element.riskAlert = true;
                    element.save(function(err, prja){
                        if (err) {
                            // retorna mensagem de erro
                            console.log('Erro salvando projeto no cronometro semanal.');
                        }
                    });
                });
            });
        }, function () {
            // This function is executed when the job stops
            console.log('cron terminou - semanal');
        },
            true // Start the job right now
        );
    },

    initMonth: function(){
        var job = new CronJob('1 * * * * *', function() {
        //var job = new CronJob('00 30 11 1 * *', function() {
            // acompanhamento mensal de projetos cancelados (roda todo dia 1, às 11h30)

            var x = new Date(); // nova data
            x.setDate(1); // começa no dia 1
            x.setMonth(x.getMonth()-1); // volta um mês

            var y = new Date();
            y.setDate(1);

            projetoModel.find({ 
                "status": "Cancelado",
                "dateChangeStatus" : { 
                  $lt: y, 
                  $gte: x
                }
            }).lean().exec((err, obj)=>{
                if (err) {
                    // erro...
                    console.log("Erro no cronometro mensal...");
                    return;
                }
                //console.log('job 1', obj);
                // envia emails para diretoria...
                let mailMessage
                if (obj.lenght == undefined || obj.lenght == 0) {
                    //console.log('job 2');
                    mailMessage = "Relatório mensal.\n\nNo mês " + (x.getMonth() + 1) + ", nenhum projeto foi cancelado.";
                }
                if (obj.lenght == 1) {
                    //console.log('job 3');
                    mailMessage = "Relatório mensal.\n\nNo mês " + (x.getMonth() + 1) + ", 1 projeto foi cancelado.";
                }
                if (obj.lenght > 1) {
                    //console.log('job 4');
                    mailMessage = "Relatório mensal.\n\nNo mês " + (x.getMonth() + 1) + ", " + obj.lenght + " projetos foram cancelados.";
                }
                //console.log('job 5', obj.lenght);
                if (mailMessage) {
                    mailer.setTo(" ");
                    mailer.setMessage(mailMessage);
                    mailer.send(); // envia email!
                }
            });

        }, function () {
            // This function is executed when the job stops
            console.log('cron terminou - mensal');
        },
            true // Start the job right now
        );
    },

    initTest: function(){
        var job = new CronJob('4 * * * * *', function() {
            // job
            console.log('mensagem a cada segundo 4')
        }, function () {
            // This function is executed when the job stops
            console.log('cron terminou mês');
        },
            true // Start the job right now
        );
    }

}

module.exports = cron;