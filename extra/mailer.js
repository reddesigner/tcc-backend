// shield.bearer
// shield*99

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://shieldbearermaster%40gmail.com:shield*99@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Portifolio de Projetos" <port.proj@pp.com>', // sender address // vai sempre com o endereço do gmail como remetente...
    to: 'designador@gmail.com, red.designer@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Olá mundinho cão... Hello world ?', // plaintext body
    html: '<b>Hello world ?</b> this is cool! Or maybe not... será que é?' // html body
};

// send mail with defined transport object
/*
transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
        return console.log(error);
    }
    console.log('Messagem enviada: ' + info.response);
});
*/

mailer = {
    send: function() {
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                return console.log(error);
            }
            console.log('Messagem enviada: ' + info.response);
        });
    }
}

module.exports = mailer;