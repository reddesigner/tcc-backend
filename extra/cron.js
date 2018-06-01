var CronJob = require('cron').CronJob;

cron = {

    initWeek: function(){
        var job = new CronJob('00 30 11 * * 5', function() {
            // acompanhamento semanal de projetos de risco alto
            // TODO alerta na interface?
        }, function () {
            // This function is executed when the job stops
            console.log('cron terminou week');
        },
            true // Start the job right now
        );
    },

    initMonth: function(){
        var job = new CronJob('00 30 11 2 * *', function() {
            // acompanhamento mensal de projetos cancelados
            // TODO envia email
        }, function () {
            // This function is executed when the job stops
            console.log('cron terminou mês');
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