const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

// each model instance represents a record ou register
// schemas represent individual records
const userSchema = new Schema({
    googleId: String
});
// ,name: String

// Collections are created by making a 'model class'
// if already exists, only instantiate it
//-> .model with two arguments create a collection
//-> I imagine that with only one (like in passport.js) only instatiate
mongoose.model('users', userSchema);
