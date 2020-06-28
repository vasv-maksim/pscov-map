const { Schema, model } = require('mongoose');

const schema  = new Schema({
    login: { type: String, requires: true, unique: true },
    password: { type: String, requires: true },
});

module.exports = model('users', schema);