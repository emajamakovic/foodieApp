const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priceRange: {
    type: String,
    required: true
  },
  cuisines: {
    type: Array,
    required: true
  },
  postedBy: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
   number: {
    type: String,
    required: true
  }, 
  workingTime: {
    type: String,
    required: true
  },
   address: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  likedBy: {
    type: Array
  },
  image: {
    data: Buffer,
    contentType: String,
    name: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Restaurant', restaurantSchema)