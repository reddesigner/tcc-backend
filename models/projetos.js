var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    dateStart: Date,
    dateEnd: Date,
    datePrevision: Date,
    status: String,
    justification: String,
    dateChangeStatus: Date,
    userChangeStatus: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        role: String
    },
    description: String,
    budget: Number, // TODO parece que não pode haver virgula, deve ser ponto o separador fracionario
    risk: String,
    actualPhase: Number, // 4 fases do RUP: inicio, elaboração, construção e transição
    // relacionamentos
    phases: {
        phase1: [{ // fase 1: 
            indicators: Schema.Types.ObjectId,
            name: String,
            value: Number,
            max: Number,
            min: Number
        }],
        phase2: [{
            indicators: Schema.Types.ObjectId,
            name: String,
            value: Number,
            max: Number,
            min: Number
        }],
        phase3: [{
            indicators: Schema.Types.ObjectId,
            name: String,
            value: Number,
            max: Number,
            min: Number
        }],
        phase4: [{
            indicators: Schema.Types.ObjectId,
            name: String,
            value: Number,
            max: Number,
            min: Number
        }]
    },
    indicators: [{
        indicators: Schema.Types.ObjectId,
        name: String,
        value: Number,
        max: Number,
        min: Number
    }],
    team: [{
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        role: String
    }],
    manager: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        role: String
    }
});

module.exports = mongoose.model('project', projectSchema);