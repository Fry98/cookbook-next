const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  recipes: Array
});

const List = mongoose.model('list', listSchema);
module.exports = List;