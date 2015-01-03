var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    name: String,
    games_played : Number
});

module.exports = mongoose.model('Player', PlayerSchema);