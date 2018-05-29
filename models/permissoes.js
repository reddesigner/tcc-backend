var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    view: String,
    route: String,
    role: []
});

module.exports = mongoose.model('permission', permissionSchema);