var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indicatorSchema = new Schema({
    name: String,
    projects: [{
        _id: Schema.Types.ObjectId,
        name: String
    }]
});

module.exports = mongoose.model('indicator', indicatorSchema);