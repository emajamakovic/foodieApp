const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
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
  },
   category: {
    type: String,
    required: true
  }, 
  likes: {
    type: Number,
    required: true
  }, 
  image: {
    data: Buffer,
    contentType: String,
    name: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)