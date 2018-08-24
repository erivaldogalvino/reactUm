// Recipients é de iteração dentro do documento, entao se preocupar com
// lmitação de 20 Mb por registro do mongo

const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
