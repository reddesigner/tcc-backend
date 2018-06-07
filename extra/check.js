permissionModel = require('../models/permissoes');

module.exports = {

    checkPermission: function(req, callback) {

        //console.log('\n\ncheck.js --- Verificando Permissões');
        //console.log('\n\ncheck.js --- url', req.url);
        //console.log('\n\ncheck.js --- role', req.decoded.role);

        const _url = req.url;
        const _role = req.decoded.role;
        //
    
        // se não houver token, retorna
        if (!req.decoded) {
            console.log('\n\ncheck.JS\ntoken não identificado, retornando void...');
            return;
        }

        // lista de permissões que será retornada
        var permList = '';
        var freeToGo = false;

        permissionModel.find({
            //route: req.url
            role: _role
        }).lean().exec(function(err, perm) {
            if (err) {
                console.log('\n\check.js - Falha na comparação de permissões de views/roles.');
                res.status(400);
                res.json({ message: 'Falha na consulta de permissões da aplicação.', type: 'error' });
                throw(false);
                return;
            }
            //console.log('\ncheck.js --- perm', perm);
            if (typeof perm !== 'undefined' && perm.length > 0) { 
            //if (perm.lenght == 0 || perm.lenght == undefined) {
                //console.log('\ncheck.js --- ok, existe o objeto permission... agora é fazer a checkagem de permissão/perfil', perm);
                //freeToGo = false;
            } else {
                //freeToGo = true;
            }
            //
            perm.forEach(element => {
                if (permList.length>0)
                    permList += ',';
                permList += element.route;
    //console.log('\ncheck.js --- ok, dentro do forEach', _url);
                if (_url.indexOf(element.route) >= 0) {
    //console.log('\ncheck.js --- noooooooooooooooo, permissão ainda não encontrada para role '+_role+' na rota '+element.route);
                    if (element.role.indexOf(_role) >= 0) {
    //console.log('\ncheck.js --- ok!!!  Permissão encontrada para role '+_role+' na rota '+element.route);
                        freeToGo = true;
                    }//else if (element.role.length == 0) { // se não houver role indicado todos podem usar rota (desde que logados) ?
                    //    freeToGo = true;
                    //}
                }
            });
            //freeToGoCallback(); // calback para garantir que o lean().exec() seja executado e só então verificar se vai para o next()
            if (freeToGo) {
                //console.log('\ncheck.js ---- retorna a lista', permList);
                //return permList;
                callback(permList);
            } else {
                //console.log('\ncheck.js ---- FALSE');
                //return false;
                callback(null);
            }
        });

    }

}
