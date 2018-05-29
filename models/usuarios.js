var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: String
});

// pre hook que será ativado antes do método save
userSchema.pre('save', async function(next){
    const hashpass = await bcrypt.hash(this.password, 6);
    this.password = hashpass;
    next();
});

// comprar o password informado com o do modelo
userSchema.methods.isValidPassword = async function(password){
    const compare = await bcrypt.compare(password, this.password);
    return compare;
}

module.exports = mongoose.model('user', userSchema);