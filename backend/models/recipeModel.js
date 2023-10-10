const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  directions: {
    type: String,
    required: true
  },
  postedBy: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)