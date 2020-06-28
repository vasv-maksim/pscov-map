const { Schema, model } = require('mongoose');

const schema  = new Schema({
    title: { type: String, requires: true, unique: true },
    description: { type: String, requires: true },
    user: { ref: 'users', type: Schema.Types.ObjectId, requires: true },
    url: { type: String, requires: true },
    date: { type: Date, default: Date.now },
});

module.exports = model('basemaps', schema);