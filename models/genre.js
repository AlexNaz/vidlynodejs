const Joi = require('joi');
const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30
  }
});  
const Genre = mongoose.model('Genre', genresSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genresSchema = genresSchema;
exports.validate = validateGenre;