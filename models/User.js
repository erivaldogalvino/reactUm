const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

// cada instancia model representa um registro ou "register"
// "schemas" representa "records" individuais
// schemas represent individual records
const userSchema = new Schema({
    googleId: String,
    // para o stripe
    // Quando especifico o Schema (mongo) devo dizer qual o "type"
    // e seu valor default.  Boa prática par o mongo 
    credits: { type: Number, default: 0 }
});
// ,name: String

// Collections são criadas por 'model class'
// Se já existem, é somente instanciada
//-> .model com dois argumentos, cria uma collection
//-> Eu imagino que com somente um argumento (Como em passport.js) somente instancia
mongoose.model('users', userSchema);
