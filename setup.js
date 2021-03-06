var express = require('express');
var router = express.Router();

/*var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
*/

var userModel = require('./models/usuarios');
var permissionModel = require('./models/permissoes');

router.get('/', function(req, res){

    // insere um usuário de SETUP

    // verifica se já existe
    userModel.findOne({ 'name': 'Usuário SETUP' }, function(err, obj){
        if (err) {
            // erro!
            console.log('erro na função de SETUP');
        }
        // já existe o objeto
        console.log('Usuário SETUP - já existe um usuário de setup... regravando por cima...');
    });

    var User = new userModel();
    User.name = 'Usuário SETUP';
    User.email = 'redfrigerator@gmail.com';
    User.password = 'red123a';
    User.role = 'Administrador';

    User.save(function(err, usr){
        if (err) {
            if (err.code == 11000) // código para campo único
                res.json({ message: 'Erro na inclusão de Usuário. Email já existe na base.', type: 'error' });
            else
                res.json({ message: 'Erro na inclusão de Usuário', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(usr);
    });

    // insere Permissões

    var Permission = new permissionModel();
    Permission.view = 'Projetos';
    Permission.route = '/projeto';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //
    
    Permission = new permissionModel();
    Permission.view = 'Usuários';
    Permission.route = '/usuario';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    Permission = new permissionModel();
    Permission.view = 'Indicadores';
    Permission.route = '/indicador';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    Permission = new permissionModel();
    Permission.view = 'Projeto - Equipe';
    Permission.route = '/projeto-equipe';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    Permission = new permissionModel();
    Permission.view = 'Projeto - Indicadores';
    Permission.route = '/projeto-indicador';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    Permission = new permissionModel();
    Permission.view = 'Projeto - Indicador - Fase';
    Permission.route = '/projeto-indicador-fase';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    Permission = new permissionModel();
    Permission.view = 'Projeto - Status';
    Permission.route = '/projeto-status';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    Permission = new permissionModel();
    Permission.view = 'Relatório';
    Permission.route = '/relatorio';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    // ops, não deve existir permissão para permissões...
    Permission = new permissionModel();
    Permission.view = 'Permissões';
    Permission.route = '/permissao';
    Permission.role = 'Administrador';

    Permission.save(function(err, obj){
        if (err) {
            res.json({ message: 'Erro na inclusão de Permissão / Tela.', type: 'error' });
            console.dir(err);
            return;
        }
        // Devolve o objeto salvo
        //res.json(obj);
        console.log('ok, colocou uma permissão...');
    });

    //

    res.json({ message: 'Ok, parece que foi um sucesso o processo de inclusão de Permissões/Tela.', type: 'success' });

});

module.exports = router;